import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Resource } from "../entities/resource.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Teacher } from "../entities/teacher.entity";
import { Repository } from "typeorm";
import { ResourceType } from "../entities/resourcetype.entity";
import { UpdateResourceRequestDTO } from "shared-nextdoor-education/dist/update-resource-request.dto";
import { CreateResourceDTO } from "shared-nextdoor-education/dist/create-resource.dto";
import { ResourceMapper } from "../mappers/resource.mapper";
import * as fs from "node:fs";
import { readFile } from "node:fs/promises";

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
    @InjectRepository(ResourceType)
    private readonly resourceTypeRepository: Repository<ResourceType>
  ) {}

  async addResource(teacherId: number, createResourceDTO: CreateResourceDTO, file: Express.Multer.File) {
    try {
      const [teacher] = await Promise.all([this.teacherRepository.findOne({ where: { id: teacherId } })]);
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }

      const resourceType = await this.resourceTypeRepository.findOne({ where: { type: createResourceDTO.resourceType } });
      if (!resourceType) {
        throw new NotFoundException(`Resource type ${createResourceDTO.resourceType} not found`);
      }

      const resource = new Resource();
      resource.title = createResourceDTO.title;
      resource.description = createResourceDTO.description;
      resource.resourceType = resourceType;
      resource.teacher = teacher;

      // Save the resource to get its id
      const savedResource = await this.resourceRepository.save(resource);

      // Create the directory if it doesn't exist
      const directory = `uploads/${teacherId}/resources`;
      await fs.promises.mkdir(directory, { recursive: true });

      // Handle the file
      const fileName = `${savedResource.id}_${file.originalname}`;
      const filePath = `${directory}/${fileName}`;
      savedResource.filePath = filePath;

      // Move the file to the correct location
      await fs.promises.rename(file.path, filePath);

      // Update the resource with the file path
      await this.resourceRepository.save(savedResource);

      return ResourceMapper.toDTO(savedResource);
    } catch (error) {
      throw error;
    }
  }



  async getResources(teacherId: number, resourceType?: string) {
    try {
      const teacher = await this.teacherRepository.findOneBy({ id: teacherId });
      if (!teacher) {
        throw new NotFoundException(`Teacher with ID ${teacherId} not found`);
      }

      const query = this.resourceRepository
        .createQueryBuilder('resource')
        .select([
          'resource.id',
          'resource.title',
          'resource.description',
          'resource.filePath',
          'resource.createdAt',
          'resource.lastUpdated',
          'resourceType.id',
          'resourceType.type',
          'teacher.id',
          'teacher.email',
          'teacher.firstName',
          'teacher.lastName',
        ])
        .innerJoin('resource.resourceType', 'resourceType')
        .innerJoin('resource.teacher', 'teacher')
        .where('resource.teacher_id = :teacherId', { teacherId });

      if (resourceType) {
        query.andWhere('resourceType.type = :resourceType', { resourceType });
      }


      const resources = await query.getMany();
      const dtos = ResourceMapper.toDTOs(resources);
      console.log(dtos)
      return dtos

    } catch (error) {
      console.error('Error getting resources:', error);
      throw error;
    }
  }

  async updateResource(id: number, updateResourceRequestDTO: UpdateResourceRequestDTO) {
    try {
      const resource = await this.resourceRepository.findOneBy({ id });
      if (!resource) {
        throw new NotFoundException(`Resource with ID ${id} not found`);
      }

      if (updateResourceRequestDTO.title) {
        resource.title = updateResourceRequestDTO.title;
      }

      if (updateResourceRequestDTO.description) {
        resource.description = updateResourceRequestDTO.description;
      }

      await this.resourceRepository.save(resource);

      // Map the updated resource to a ResourceDTO object
      return ResourceMapper.toDTO(resource);
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  }

  async deleteResource(id: number) {
    try {
      const resource = await this.resourceRepository.findOneBy({ id });
      if (!resource) {
        throw new NotFoundException(`Resource with ID ${id} not found`);
      }

      await this.resourceRepository.delete(id);

      return { message: `Resource with ID ${id} deleted successfully` };
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  }
}
