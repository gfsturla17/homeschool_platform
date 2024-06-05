import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateTeacherProfileRequestDTO } from "shared-nextdoor-education/dist/update-teacher-profile-request.dto";
import { TeacherProfile } from "../entities/teacherprofile.entity";
import { Teacher } from "../entities/teacher.entity";
import { TeacherService } from "./teachers.service";
import { RegisterTeacherDTO } from "shared-nextdoor-education";
import { TeacherLoginCredentials } from "../entities/teacherlogincredentials.entity";
import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { UserRole } from "../entities/userrole.entity";


describe('TeacherService', () => {
  let service: TeacherService;
  let userRepository;
  let roleRepository;
  let userRoleRepository;
  let teacherRepository;
  let teacherProfileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Role, UserRole, Teacher, TeacherProfile],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Role, UserRole, Teacher, TeacherProfile]),
      ],
      providers: [TeacherService],
    }).compile();

    service = module.get<TeacherService>(TeacherService);
  });

  it('should create a teacher', async () => {
    const registerTeacherDTO: RegisterTeacherDTO = {
      email: 'test@example.com',
      password: 'password',
      firstName: 'John',
      lastName: 'Doe',
    };

    const result = await service.createTeacher(registerTeacherDTO);

    expect(userRepository.save).toHaveBeenCalledTimes(1);
    expect(roleRepository.findOne).toHaveBeenCalledTimes(1);
    expect(userRoleRepository.save).toHaveBeenCalledTimes(1);
    expect(teacherRepository.save).toHaveBeenCalledTimes(1);
    expect(teacherProfileRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ id: 1 });
  });
});