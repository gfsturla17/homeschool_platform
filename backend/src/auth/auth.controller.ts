import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { LoginRequestDTO, RegisterTeacherDTO } from "shared-nextdoor-education";
import { LoginResponseDTO } from "shared-nextdoor-education/dist/login-response-dto";
import { BypassAuth } from "./bypass-auth.decorator";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @BypassAuth()
  @Post('login')
  async login(@Body() loginRequestDTO: LoginRequestDTO): Promise<LoginResponseDTO> {
    console.log(loginRequestDTO);
    return this.authService.login(loginRequestDTO);
  }

  @BypassAuth()
  @Post('logout')
  async logout(@Res() res: Response): Promise<void> {
    return this.authService.logout(res);
  }
}

