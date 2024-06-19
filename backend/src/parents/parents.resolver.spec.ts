import { ParentResolver } from "./parents.resolver";
import { ParentService } from "./parents.service";
import { Test, TestingModule } from "@nestjs/testing";
import { CreateParentInput, ParentGraphQL } from "./parents.graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Parent } from "../entities/parent.entity";
import { ParentProfile } from "../entities/parentprofile.entity";
import { UserRole } from "../entities/userrole.entity";
import { Role } from "../entities/role.entity";
import { Address } from "../entities/address.entity";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { JwtService } from "@nestjs/jwt";


describe('ParentResolver', () => {
  let resolver: ParentResolver;
  let service: ParentService;
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockToken'),
    verify: jest.fn().mockReturnValue({ userId: 1 }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Parent, ParentProfile, UserRole, Role, Address],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Parent, ParentProfile, Address, Role, UserRole]),
      ],
      providers: [ParentResolver, ParentService, {
        provide: JwtService,
        useValue: mockJwtService,
      }],

    }).compile();

    resolver = module.get<ParentResolver>(ParentResolver);
    service = module.get<ParentService>(ParentService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('signupParent', () => {
    it('should create a new parent', async () => {
      const createParentInput: CreateParentInput = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
      };

      const createdParent: ParentGraphQL = {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        userId: 1
      };

      jest.spyOn(service, 'createParent').mockResolvedValue(createdParent);

      const result = await resolver.signupParent(createParentInput);

      expect(result).toEqual(createdParent);
      expect(service.createParent).toHaveBeenCalledTimes(1);
      expect(service.createParent).toHaveBeenCalledWith(createParentInput);
    });
  });
});