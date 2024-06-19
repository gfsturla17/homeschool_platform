
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BadRequestException, UseGuards, UsePipes, ValidationError, ValidationPipe } from "@nestjs/common";
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { ParentService } from "./parents.service";
import { CreateParentInput, ParentGraphQL } from "./parents.graphql";
import { Role } from "../auth/role.enum";
import { BypassAuth } from "../auth/bypass-auth.decorator";

@Resolver('Parent')
export class ParentResolver {
  constructor(private readonly parentService: ParentService) {}

  @Mutation(returns => ParentGraphQL)
  @BypassAuth()
  async signupParent(@Args('data') data: CreateParentInput) {
      return await this.parentService.createParent(data);
  }

  @Query(returns => [ParentGraphQL], { description: 'Get list of all parents' })
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Teacher)
  async getParents() {
    return await this.parentService.getAllParents();
  }
}

