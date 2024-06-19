import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "../entities/teacher.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { TeacherProfile } from "../entities/teacherprofile.entity";
import { RegisterTeacherDTO } from "shared-nextdoor-education";
import { UpdateTeacherProfileRequestDTO } from "shared-nextdoor-education/dist/update-teacher-profile-request.dto";
import { UpdateTeacherProfileResponseDTO } from "shared-nextdoor-education/dist/update-teacher-profile-response.dto";
import { GetTeacherProfileResponseDTO } from "shared-nextdoor-education/dist/get-teacher-profile-response.dto";
import { Resource } from "../entities/resource.entity";
import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { UserRole } from "../entities/userrole.entity";


@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TeacherProfile)
    private readonly teacherProfileRepository: Repository<TeacherProfile>,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>
  ) {
  }

  async getResources(teacherId: number, resourceType?: string) {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id: teacherId });
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }

      const query = this.resourceRepository
        .createQueryBuilder('resource')
        .where('resource.teacher_id = :teacherId', { teacherId });

      if (resourceType) {
        query
          .innerJoin('resource.resourceType', 'resourceType')
          .andWhere('resourceType.type = :resourceType', { resourceType });
      }

      const resources = await query.getMany();

      return resources;
    } catch (error) {
      console.error('Error getting resources:', error); // This will log the error
      throw error;
    }
  }

  async createTeacher(registerTeacherDTO: RegisterTeacherDTO): Promise<Teacher> {
    try {
      const user = new User();
      user.email = registerTeacherDTO.email;
      user.password = await bcrypt.hash(registerTeacherDTO.password, 10);
      await this.userRepository.save(user);

      let teacherRole = await this.roleRepository.findOne({ where: { name: 'Teacher' } });
      if (!teacherRole) {
        teacherRole = new Role();
        teacherRole.name = 'Teacher';
        await this.roleRepository.save(teacherRole);
      }

      if (!teacherRole || !teacherRole.name) {
        throw new Error("Role 'Teacher' was not properly created");
      }

      const userRole = new UserRole();
      userRole.user = user;
      userRole.role = teacherRole;
      userRole.assignedAt = new Date();
      await this.userRoleRepository.save(userRole);

      const teacher = new Teacher();
      teacher.firstName = registerTeacherDTO.firstName;
      teacher.lastName = registerTeacherDTO.lastName;
      teacher.user = user;
      await this.teacherRepository.save(teacher);

      const teacherProfile = new TeacherProfile();
      teacherProfile.teacher = teacher;
      await this.teacherProfileRepository.save(teacherProfile);

      return teacher;
    } catch (error) {
      throw error;
    }
  }

  async getTeacherProfile(teacherId: number): Promise<GetTeacherProfileResponseDTO> {
    const teacher = await this.teacherRepository.findOneBy({ id: teacherId });
    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    const teacherProfile = await this.teacherProfileRepository.findOneBy({ teacher: { id: teacherId } });
    if (!teacherProfile) {
      throw new NotFoundException(`Teacher profile for teacher with ID ${teacherId} not found`);
    }

    const user = await this.userRepository.findOneBy({ id: teacher.user.id });

    return {
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: user.email,
      phone: '', // Phone is not present in the entities
      address: teacherProfile.address,
      city: teacherProfile.city,
      state: teacherProfile.state,
      biography: teacherProfile.biography,
      tiktokLink: teacherProfile.tiktokLink,
      twitterLink: teacherProfile.twitterLink,
      facebookLink: teacherProfile.facebookLink,
      instagramLink: teacherProfile.instagramLink,
    };
  }

  async updateTeacherProfile(
    teacherId: number,
    updateTeacherProfileDTO: UpdateTeacherProfileRequestDTO,
  ): Promise<UpdateTeacherProfileResponseDTO> {
    
    const teacher = await this.teacherRepository.findOne({
      where: { id: teacherId },
      relations: ['user'],
    });

    if (!teacher) {
      throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
    }

    const teacherProfile = await this.teacherProfileRepository.findOne({
      where: { teacher: { id: teacherId } },
    });
    if (!teacherProfile) {
      throw new NotFoundException(`Teacher profile for teacher with ID ${teacherId} not found`);
    }

    teacher.firstName = updateTeacherProfileDTO.firstName;
    teacher.lastName = updateTeacherProfileDTO.lastName;

    const user = await this.userRepository.findOneBy({ id: teacher.user.id });

    teacherProfile.address = updateTeacherProfileDTO.address;
    teacherProfile.city = updateTeacherProfileDTO.city;
    teacherProfile.state = updateTeacherProfileDTO.state;
    teacherProfile.biography = updateTeacherProfileDTO.biography;
    teacherProfile.tiktokLink = updateTeacherProfileDTO.tiktokLink;
    teacherProfile.twitterLink = updateTeacherProfileDTO.twitterLink;
    teacherProfile.facebookLink = updateTeacherProfileDTO.facebookLink;
    teacherProfile.instagramLink = updateTeacherProfileDTO.instagramLink;

    await this.teacherRepository.save(teacher);
    await this.userRepository.save(user);
    await this.teacherProfileRepository.save(teacherProfile);

    return {
      id: teacherProfile.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      email: user.email,
      phone: updateTeacherProfileDTO.phone,
      address: teacherProfile.address,
      city: teacherProfile.city,
      state: teacherProfile.state,
      biography: teacherProfile.biography,
      tiktokLink: teacherProfile.tiktokLink,
      twitterLink: teacherProfile.twitterLink,
      facebookLink: teacherProfile.facebookLink,
      instagramLink: teacherProfile.instagramLink,
    };
  }
}