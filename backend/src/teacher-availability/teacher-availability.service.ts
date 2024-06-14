import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeacherAvailabilityInput } from './teacher-availability.input';
import { TeacherAvailability } from "../entities/teacheravailability.entity";
import { Teacher } from "../entities/teacher.entity";



@Injectable()
export class TeacherAvailabilityService {
  constructor(
    @InjectRepository(TeacherAvailability)
    private readonly teacherAvailabilityRepository: Repository<TeacherAvailability>,
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

  async createTeacherAvailability(teacherId: number, availability: TeacherAvailabilityInput) {
    const existingTeacher = await this.teacherRepository.findOne({ where: { userId: teacherId } });
    if (!existingTeacher) {
      throw new Error('Teacher does not exist');
    }

    const existingAvailability = await this.teacherAvailabilityRepository.findOne({
      where: {
        teacher: { id: existingTeacher.id },
        startDateTime: availability.startDateTime,
        endDateTime: availability.endDateTime,
        repeatFrequency: availability.repeatFrequency,
      },
    });

    if (existingAvailability) {
      existingAvailability.startDateTime = availability.startDateTime;
      existingAvailability.endDateTime = availability.endDateTime;
      existingAvailability.repeatFrequency = availability.repeatFrequency;
      return await this.teacherAvailabilityRepository.save(existingAvailability);
    } else {
      const teacherAvailability = this.teacherAvailabilityRepository.create({
        teacher: existingTeacher,
        startDateTime: availability.startDateTime,
        endDateTime: availability.endDateTime,
        repeatFrequency: availability.repeatFrequency,
      });
      return await this.teacherAvailabilityRepository.save(teacherAvailability);
    }
  }

  async getTeacherAvailability(teacherId: number) {
    try {
      const existingTeacher = await this.teacherRepository.findOne({ where: { userId: teacherId } });
      if (!existingTeacher) {
        throw new Error('Teacher does not exist');
      }
      return await this.teacherAvailabilityRepository.find({ where: { teacher: { userId: teacherId } } });
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get teacher availability');
    }
  }

  async updateTeacherAvailability(teacherId: number, availabilityId: number, availability: TeacherAvailabilityInput): Promise<TeacherAvailability> {
    const existingAvailability = await this.teacherAvailabilityRepository.findOne({
      where: {
        id: availabilityId,
        teacher: { id: teacherId },
      },
    });

    if (!existingAvailability) {
      throw new NotFoundException(`Availability with id ${availabilityId} for teacher ${teacherId} not found.`);
    }


    const updatedAvailability = await this.teacherAvailabilityRepository.preload({
      id: availabilityId,
      ...availability,
    });
    await this.teacherAvailabilityRepository.save(updatedAvailability);

    return updatedAvailability;
  }
}


