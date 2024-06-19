import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Parent } from "../entities/parent.entity";
import { ParentProfile } from "../entities/parentprofile.entity";
import { CreateParentInput, ParentGraphQL } from "./parents.graphql";
import { Address } from "../entities/address.entity";
import { User } from "../entities/user.entity";
import { UserRole } from "../entities/userrole.entity";
import { Role } from "../entities/role.entity";
import * as bcrypt from "bcrypt";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

@Injectable()
export class ParentService {
  constructor(
    @InjectRepository(Parent)
    private readonly parentRepository: Repository<Parent>,
    @InjectRepository(ParentProfile)
    private readonly parentProfileRepository: Repository<ParentProfile>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}


  async createParent(data: CreateParentInput): Promise<ParentGraphQL> {
    try {
      const user = new User();
      user.email = data.email;
      user.password = await bcrypt.hash(data.password, 10);
      const savedUser = await this.userRepository.save(user);

      let parentRole = await this.roleRepository.findOne({ where: { name: 'Parent' } });
      if (!parentRole) {
        parentRole = new Role();
        parentRole.name = 'Parent';
        await this.roleRepository.save(parentRole);
      }

      if (!parentRole || !parentRole.name) {
        throw new Error("Role 'Parent' was not properly created");
      }

      const userRole = new UserRole();
      userRole.user = savedUser;
      userRole.role = parentRole;
      userRole.assignedAt = new Date();
      await this.userRoleRepository.save(userRole);

      const parent = new Parent();
      parent.firstName = data.firstName;
      parent.lastName = data.lastName;
      parent.userId = savedUser.id;
      const savedParent = await this.parentRepository.save(parent);

      const parentProfile = new ParentProfile();
      parentProfile.parent = savedParent;
      parentProfile.biography = data.biography;
      parentProfile.profilePictureUrl = data.profilePictureUrl;

      savedParent.profile = await this.parentProfileRepository.save(parentProfile)
      console.log("Saved Parent: ", savedParent)
      let parentgraphql = this.mapper.map(parent, Parent, ParentGraphQL);
      parentgraphql.id = 1
      console.log("Parent GraphQL: ", parentgraphql)
      return parentgraphql
    } catch (error) {
      throw error;
    }
  }

  async getAllParents(): Promise<Parent[]> {
    return await this.parentRepository.find({ relations: ['profile'] });
  }
}
