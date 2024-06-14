import { ExecutionContext } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { TeacherAvailabilityService } from "./teacher-availability.service";
import { TeacherAvailabilityResolver } from "./teacher-availability.resolver";
import { TeacherAvailabilityGraphQL } from "./teacher-availability.dto";
import { TeacherAvailability } from "../entities/teacheravailability.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "../entities/teacher.entity";
import { JwtService } from "@nestjs/jwt";

describe('TeacherAvailabilityResolver', () => {
  let resolver: TeacherAvailabilityResolver;
  let service: TeacherAvailabilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'username',
          password: 'password',
          database: 'database',
          entities: [TeacherAvailability, Teacher],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([TeacherAvailability, Teacher]),
      ],
      providers: [TeacherAvailabilityResolver, TeacherAvailabilityService, JwtService],
    }).compile();

    resolver = module.get<TeacherAvailabilityResolver>(TeacherAvailabilityResolver);
    service = module.get<TeacherAvailabilityService>(TeacherAvailabilityService);
  });

  it('should return teacher availability', async () => {
    const teacherAvailability = [new TeacherAvailability()];
    jest.spyOn(service, 'getTeacherAvailability').mockResolvedValue(teacherAvailability);

    const result = await resolver.getTeacherAvailability(1);
    expect(result).toBeInstanceOf(Array);
  });
});

//   it('should throw UnauthorizedException if no authentication token is provided', async () => {
//     const context = {
//       switchToHttp: () => ({
//         getRequest: () => ({
//           headers: {},
//         }),
//       }),
//     } as ExecutionContext;
//
//     await expect(resolver.getTeacherAvailability(1, context)).rejects.toThrow('Unauthorized');
//   });
//
//   it('should throw ForbiddenException if the user does not have the required role', async () => {
//     const context = {
//       switchToHttp: () => ({
//         getRequest: () => ({
//           headers: {
//             authorization: 'Bearer invalid-token',
//           },
//         }),
//       }),
//     } as ExecutionContext;
//
//     await expect(resolver.getTeacherAvailability(1, context)).rejects.toThrow('Forbidden');
//   });
// });