import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher.entity";
import { ResourceType } from "./resourcetype.entity";

@Entity()
export class Resource {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @ManyToOne(() => ResourceType, (resourceType) => resourceType.id)
  @JoinColumn({ name: 'resource_type_id' })
  resourceType!: ResourceType;

  @Column({ nullable: true })
  filePath!: string; // This will store the file path or link

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  @JoinColumn({ name: 'teacher_id' })
  teacher!: Teacher;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  lastUpdated!: Date;
}