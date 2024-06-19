import { Test, TestingModule } from '@nestjs/testing';
import { Parent } from '../entities/parent.entity';
import { ParentProfile } from "../entities/parentprofile.entity";
import { ParentGraphQL } from "../parents/parents.graphql";
import { Mapper } from "@automapper/core";
import { classes } from "@automapper/classes";
import { AutomapperModule, getMapperToken } from "@automapper/nestjs";
import { ParentGraphqlMappingProfile } from "./parent-graphql-mapping.profile";
import { User } from "../entities/user.entity";
import { Address } from "../entities/address.entity";

describe('ParentProfile', () => {
  let mapper: Mapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      providers: [ParentProfile, ParentGraphqlMappingProfile],
    }).compile();

    mapper = module.get(getMapperToken());
  });

  it('should map Parent to ParentGraphQL', () => {
    const address = new Address();
    address.address = '123 Main St';
    address.city = 'Anytown';
    address.state = 'CA';

    const user = new User();
    user.address = address;

    const parentProfile = new ParentProfile();
    parentProfile.biography = 'This is a biography';
    parentProfile.profilePictureUrl = 'https://example.com/profile-picture';
    parentProfile.parent = new Parent();
    parentProfile.parent.user = user;

    const parent = new Parent();
    parent.firstName = 'John';
    parent.lastName = 'Doe';
    parent.userId = 1;
    parent.profile = parentProfile;

    const parentGraphQL: ParentGraphQL = mapper.map(parent, Parent, ParentGraphQL);

    expect(parentGraphQL.firstName).toBe('John');
    expect(parentGraphQL.lastName).toBe('Doe');
    expect(parentGraphQL.userId).toBe(1);
    expect(parentGraphQL.profile).not.toBeNull();
    expect(parentGraphQL.profile.biography).toBe('This is a biography');
    expect(parentGraphQL.profile.profilePictureUrl).toBe('https://example.com/profile-picture');
    expect(parentGraphQL.profile.address).toBe('123 Main St');
    expect(parentGraphQL.profile.city).toBe('Anytown');
    expect(parentGraphQL.profile.state).toBe('CA');
  });
});