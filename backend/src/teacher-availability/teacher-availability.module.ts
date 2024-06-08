import { Module } from '@nestjs/common';
import { TeacherAvailabilityService } from './teacher-availability.service';
import { TeacherAvailabilityResolver } from './teacher-availability.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherAvailability } from "../entities/teacheravailability.entity";
import { Teacher } from "../entities/teacher.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([TeacherAvailability, Teacher])],
  providers: [TeacherAvailabilityService, TeacherAvailabilityResolver, JwtService],
})
export class TeacherAvailabilityModule {}
