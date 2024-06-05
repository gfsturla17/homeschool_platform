import 'automapper-ts';
import { ResourceDTO} from 'shared-nextdoor-education/dist/resource/resource.dto';
import { Resource } from "../entities/resource.entity";

automapper.createMap('Resource', 'ResourceDTO')
  .forMember('id', opts => opts.mapFrom('id'))
  .forMember('title', opts => opts.mapFrom('title'))
  .forMember('description', opts => opts.mapFrom('description'))
  .forMember('file', opts => opts.mapFrom('file'))
  .forMember('createdAt', opts => opts.mapFrom('createdAt'))
  .forMember('lastUpdated', opts => opts.mapFrom('lastUpdated'))
  .forMember('resourceType', opts => opts.mapFrom('resourceType'))
  .forMember('teacher', opts => opts.mapFrom('teacher'));

automapper.createMap('ResourceType', 'ResourceTypeDTO')
  .forMember('id', opts => opts.mapFrom('id'))
  .forMember('type', opts => opts.mapFrom('type'));

automapper.createMap('Teacher', 'TeacherDTO')
  .forMember('id', opts => opts.mapFrom('id'))
  .forMember('email', opts => opts.mapFrom('email'))
  .forMember('firstName', opts => opts.mapFrom('firstName'))
  .forMember('lastName', opts => opts.mapFrom('lastName'));


export class ResourceMapper {
  static toDTO(resource: Resource): ResourceDTO {
    return automapper.map('Resource', 'ResourceDTO', resource) as ResourceDTO;
  }

  static toDTOs(resources: Resource[]): ResourceDTO[] {
    return resources.map(resource => this.toDTO(resource));
  }
}