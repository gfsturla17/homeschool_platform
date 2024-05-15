import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teachers } from "./Teachers";

@Index("teacher_login_credentials_pkey", ["teacherLoginId"], { unique: true })
@Entity("teacher_login_credentials", { schema: "dbo" })
export class TeacherLoginCredentials {
  @PrimaryGeneratedColumn({ type: "integer", name: "teacher_login_id" })
  teacherLoginId: number;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("timestamp without time zone", { name: "last_login", nullable: true })
  lastLogin: Date | null;

  @ManyToOne(() => Teachers, (teachers) => teachers.teacherLoginCredentials)
  @JoinColumn([{ name: "teacher_id", referencedColumnName: "teacherId" }])
  teacher: Teachers;
}
