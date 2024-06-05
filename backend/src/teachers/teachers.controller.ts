import {
  Body,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Param, ParseIntPipe,
  Patch,
  Post, Query,
  Req,
  Res, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request, Response } from 'express';
import { TeacherService } from "./teachers.service";
import { UpdateTeacherProfileRequestDTO } from "shared-nextdoor-education/dist/update-teacher-profile-request.dto";
import { GetTeacherProfileResponseDTO } from "shared-nextdoor-education/dist/get-teacher-profile-response.dto";
import { BypassAuth } from "../auth/bypass-auth.decorator";
import { RegisterTeacherDTO } from "shared-nextdoor-education";
import { Roles } from "../auth/roles.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { Role } from "../auth/role.enum";


@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('signup')
  @BypassAuth()
  @UsePipes(new ValidationPipe())
  async createTeacher(@Body() registerTeacherDTO: RegisterTeacherDTO) {
    return this.teacherService.createTeacher(registerTeacherDTO);
  }

  @Roles(Role.Teacher)
  @Get(':id/profile')
  async getTeacherProfile(@Param('id', ParseIntPipe) teacherId: number): Promise<GetTeacherProfileResponseDTO> {
    return this.teacherService.getTeacherProfile(teacherId);
  }


  @Patch(':id/profile')
  @UsePipes(new ValidationPipe())
  async updateTeacherProfile(
    @Param('id') id: number,
    @Body() updateTeacherProfileDTO: UpdateTeacherProfileRequestDTO,
  ) {
    try {
      return this.teacherService.updateTeacherProfile(id, updateTeacherProfileDTO);
    } catch (error: any) {
      console.error(`Error updating teacher profile: ${error.message}`);
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Failed to update teacher profile',
      }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}
