import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ResourceType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  type!: string;
}