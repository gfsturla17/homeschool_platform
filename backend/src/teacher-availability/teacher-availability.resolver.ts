import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TeacherAvailabilityService } from "./teacher-availability.service";
import { TeacherAvailabilityInput } from "./teacher-availability.input";
import { TeacherAvailabilityGraphQL } from "./teacher-availability.dto";
import { BadRequestException, UseGuards, UsePipes, ValidationError, ValidationPipe } from "@nestjs/common";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { Role } from "../auth/role.enum";


@Resolver('TeacherAvailability')
export class TeacherAvailabilityResolver {
  constructor(private readonly teacherAvailabilityService: TeacherAvailabilityService) {}

  @Mutation(returns => TeacherAvailabilityGraphQL)
  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  async createTeacherAvailability(@Args('teacherId') teacherId: number, @Args('availability') availability: TeacherAvailabilityInput)
  {
    const result = await this.teacherAvailabilityService.createTeacherAvailability(teacherId, availability);
    return result;
  }

  @Query(returns => [TeacherAvailabilityGraphQL], { description: 'Get teacher availability' })
  // @UseGuards(RolesGuard)
  // @Roles(Role.Teacher)
  async getTeacherAvailability(@Args('teacherId') teacherId: number) {
    return await this.teacherAvailabilityService.getTeacherAvailability(teacherId);
  }

  @Mutation(returns => TeacherAvailabilityGraphQL)
  @UsePipes(new ValidationPipe())
  @UseGuards(RolesGuard)
  @Roles(Role.Teacher)
  async updateTeacherAvailability(
    @Args('teacherId') teacherId: number,
    @Args('availabilityId') availabilityId: number,
    @Args('availability') availability: TeacherAvailabilityInput,
  ) {
    const result = await this.teacherAvailabilityService.updateTeacherAvailability(teacherId, availabilityId, availability);
    return result;
  }
}

