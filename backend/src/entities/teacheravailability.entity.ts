import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Teacher } from './teacher.entity';
import { TeacherAvailabilityException } from "./teacheravailabilityexception.entity";

@Entity()
export class TeacherAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.availabilities)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @Column()
  startDateTime: Date;

  @Column()
  endDateTime: Date;

  @Column()
  repeatFrequency: string;

  @OneToMany(() => TeacherAvailabilityException, (exception) => exception.availability)
  exceptions: TeacherAvailabilityException[];
}