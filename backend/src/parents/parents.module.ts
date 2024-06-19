import { Module } from '@nestjs/common';
import { ParentResolver } from "./parents.resolver";
import { ParentService } from "./parents.service";
import { UserModule } from "../user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "../entities/teacher.entity";
import { TeacherLoginCredentials } from "../entities/teacherlogincredentials.entity";
import { TeacherProfile } from "../entities/teacherprofile.entity";
import { Resource } from "../entities/resource.entity";
import { ResourceType } from "../entities/resourcetype.entity";
import { Parent } from "../entities/parent.entity";
import { JwtService } from "@nestjs/jwt";
import { ParentProfile } from "../entities/parentprofile.entity";
import { Address } from "../entities/address.entity";
import { UserRole } from "../entities/userrole.entity";
import { Role } from "../entities/role.entity";


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Parent, ParentProfile, Resource, ResourceType, Address, UserRole, Role, UserRole])
  ],
  providers: [ParentResolver, ParentService, JwtService]
})
export class ParentsModule {}
