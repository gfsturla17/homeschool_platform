import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe, Patch,
  Post,
  Query, UploadedFile, UseGuards

} from "@nestjs/common";
import { ResourcesService } from "./resources.service";
import { CreateResourceDTO } from "shared-nextdoor-education/dist/create-resource.dto";
import { UpdateResourceRequestDTO } from "shared-nextdoor-education/dist/update-resource-request.dto";

import { FileUpload } from "../middleware/file-upload.decorator";
import { RolesGuard } from "../auth/roles.guard";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { Role } from "../auth/role.enum";
import { Roles } from "../auth/roles.decorator";



@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post('teacher/:teacherId')
  @Roles(Role.Teacher)
  @UseGuards(RolesGuard)
  async addResource(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Body() createResourceDTO: CreateResourceDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File not received in controller');
    }

    return this.resourcesService.addResource(teacherId, createResourceDTO, file);
  }


  @Get('teacher/:teacherId')
  async getResources(
    @Param('teacherId', ParseIntPipe) teacherId: number,
    @Query('resourceType') resourceType?: string,
  ) {
    return this.resourcesService.getResources(teacherId, resourceType);
  }

  @Delete(':id')
  async deleteResource(@Param('id', ParseIntPipe) id: number) {
    return this.resourcesService.deleteResource(id);
  }

  @Patch(':id')
  async updateResource(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateResourceRequestDTO: UpdateResourceRequestDTO,
  ) {
    return this.resourcesService.updateResource(id, updateResourceRequestDTO);
  }
}