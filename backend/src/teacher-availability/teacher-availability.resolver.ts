import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TeacherAvailabilityService } from "./teacher-availability.service";
import { TeacherAvailabilityInput } from "./teacher-availability.input";
import { TeacherAvailabilityGraphQL } from "./teacher-availability.dto";
import { UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { Role } from "../auth/role.enum";


@Resolver('TeacherAvailability')
export class TeacherAvailabilityResolver {
  constructor(private readonly teacherAvailabilityService: TeacherAvailabilityService) {}

  @Mutation(returns => TeacherAvailabilityGraphQL)
  @UsePipes(new ValidationPipe())
  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  async createTeacherAvailability(@Args('teacherId') teacherId: number, @Args('availability') availability: TeacherAvailabilityInput)
  {
    return this.teacherAvailabilityService.createTeacherAvailability(teacherId, availability);
  }

  @Query(returns => [TeacherAvailabilityGraphQL]) // Note the array return type
  @UseGuards(RolesGuard)
  @Roles(Role.Teacher) // Only allow teachers and admins to access this endpoint
  async getTeacherAvailability(@Args('teacherId') teacherId: number) {
    return await this.teacherAvailabilityService.getTeacherAvailability(teacherId);
  }
}

