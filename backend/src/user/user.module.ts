import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { UserRole } from "../entities/userrole.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, UserRole]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, TypeOrmModule.forFeature([User, Role, UserRole])],
})
export class UserModule {}
