import { TeacherDTO } from "../teacher/teacher.dto";

export class ResourceTypeDTO {
  id: number;
  type: string;
}

export class ResourceDTO {
  id: number;
  title: string;
  description: string;
  file: string;
  resourceType: ResourceTypeDTO;
  teacher: TeacherDTO;
  createdAt: Date;
  lastUpdated: Date;
}