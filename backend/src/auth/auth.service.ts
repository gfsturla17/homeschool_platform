import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TeacherService } from "../teachers/teachers.service";
import { LoginResponseDTO } from "shared-nextdoor-education/dist/login-response-dto";
import { Teacher } from "../entities/teacher.entity";
import { LoginRequestDTO } from "shared-nextdoor-education";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";


@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
    const user = await this.userService.findByEmail(loginRequestDTO.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValidPassword = await this.validatePassword(user, loginRequestDTO.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.generateToken(user);

    const response = new LoginResponseDTO();
    response.token = token;
    response.id = user.id;

    return response;
  }

  async logout(response: any): Promise<void> {
    response.clearCookie('token');
    response.status(200).json({ message: 'Logged out successfully' });
  }

  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }

  async generateToken(user: User): Promise<string> {
    const secretKey = process.env.SECRET_KEY;

    if (!secretKey) {
      throw new Error('SECRET_KEY environment variable is not defined');
    }

    const userRoles = await this.userService.getUserRoles(user.id);
    const roleNames = userRoles.map((userRole) => userRole.role.name);

    const payload = { userId: user.id, roles: roleNames };
    console.log('Token payload:', payload);
    return this.jwtService.sign(payload, { secret: secretKey, expiresIn: '1h' });
  }
}


