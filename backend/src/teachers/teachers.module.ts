import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from '../entities/teacher.entity';
import { TeacherService } from "./teachers.service";
import { TeacherLoginCredentials } from "../entities/teacherlogincredentials.entity";
import { TeacherProfile } from "../entities/teacherprofile.entity";
import { ResourceType } from "../entities/resourcetype.entity";
import { Resource } from "../entities/resource.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Teacher, TeacherLoginCredentials, TeacherProfile, Resource, ResourceType])
  ],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule {}

