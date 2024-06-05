import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './teacher.entity';

@Entity()
export class TeacherAvailability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dayOfWeek: string; // e.g. "Monday", "Tuesday", etc.

  @Column()
  startTime: string; // e.g. "08:00", "09:00", etc.

  @Column()
  endTime: string; // e.g. "12:00", "15:00", etc.

  @ManyToOne(() => Teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @Column()
  teacherId: number;
}