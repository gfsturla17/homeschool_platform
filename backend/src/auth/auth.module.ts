import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from './auth.controller';
import { TeacherModule } from "../teachers/teachers.module";
import { UserModule } from "../user/user.module";
import { Reflector } from "@nestjs/core";

@Module({
  imports: [
    PassportModule,
    UserModule,
    TeacherModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, Reflector],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
