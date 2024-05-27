export class UpdateResourceDTO {
  title?: string; // Optional properties allow partial updates
  description?: string;
  file?: string;
  resourceTypeId?: number;
}