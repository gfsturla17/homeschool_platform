import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from 'class-validator';
import { User } from "./user.entity";
import { TeacherAvailability } from "./teacheravailability.entity";


@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @OneToMany(() => TeacherAvailability, (availability) => availability.teacher)
  availabilities: TeacherAvailability[];
}
