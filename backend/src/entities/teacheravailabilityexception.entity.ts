import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TeacherAvailability } from "./teacheravailability.entity";

@Entity()
export class TeacherAvailabilityException {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TeacherAvailability, (availability) => availability.exceptions)
  @JoinColumn({ name: 'availabilityId' })
  availability: TeacherAvailability;

  @Column()
  exceptionDate: Date;
}