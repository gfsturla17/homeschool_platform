import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { getConnection, Repository } from "typeorm";
import { ParentService } from "./parents.service";
import { Parent } from "../entities/parent.entity";
import { ParentProfile } from "../entities/parentprofile.entity";
import { User } from "../entities/user.entity";
import { Role } from "../entities/role.entity";
import { UserRole } from "../entities/userrole.entity";
import { Address } from "../entities/address.entity";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { ParentGraphqlMappingProfile } from "../mappers/parent-graphql-mapping.profile";


describe('ParentService', () => {
  let service: ParentService;
  let parentRepository: Repository<Parent>;
  let parentProfileRepository: Repository<ParentProfile>;
  let userRepository: Repository<User>;
  let addressRepository: Repository<Address>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [User, Parent, ParentProfile, UserRole, Role, Address],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([User, Parent, ParentProfile, Address, Role, UserRole]),
      ],
      providers: [ParentService, ParentProfile, ParentGraphqlMappingProfile],
    }).compile();

    service = module.get<ParentService>(ParentService);
    parentRepository = module.get<Repository<Parent>>(getRepositoryToken(Parent));
    parentProfileRepository = module.get<Repository<ParentProfile>>(getRepositoryToken(ParentProfile));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    addressRepository = module.get<Repository<Address>>(getRepositoryToken(Address));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createParent', () => {
    it('should create a parent and return the created parent', async () => {
      const createParentInput = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        address: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        biography: 'Hello, I am a parent.',
        profilePictureUrl: 'https://example.com/picture.jpg',
      };

      const parent = await service.createParent(createParentInput);

      expect(parent).toBeDefined();
      expect(parent.firstName).toBe(createParentInput.firstName);
      expect(parent.lastName).toBe(createParentInput.lastName);
    });
  });


});