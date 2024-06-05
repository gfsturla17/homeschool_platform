import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Teacher } from "./teacher.entity";

@Entity()
export class TeacherLoginCredentials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  password: string;

  @OneToOne(() => Teacher)
  @JoinColumn({ name: 'teacherId' })
  teacher: Teacher;

  @Column()
  teacherId: number;
}