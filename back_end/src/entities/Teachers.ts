import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TeacherLoginCredentials } from "./TeacherLoginCredentials";
import { TeacherProfiles } from "./TeacherProfiles";
import { Teacheruploads } from "./Teacheruploads";

@Index("teachers_email_key", ["email"], { unique: true })
@Index("teachers_pkey", ["teacherId"], { unique: true })
@Entity("teachers", { schema: "dbo" })
export class Teachers {
  @PrimaryGeneratedColumn({ type: "integer", name: "teacher_id" })
  teacherId: number;

  @Column("character varying", { name: "first_name", length: 50 })
  firstName: string;

  @Column("character varying", { name: "last_name", length: 50 })
  lastName: string;

  @Column("character varying", { name: "email", unique: true, length: 100 })
  email: string;

  @Column("character varying", {
    name: "phone_number",
    nullable: true,
    length: 20,
  })
  phoneNumber: string | null;

  @Column("character varying", { name: "address", nullable: true, length: 200 })
  address: string | null;

  @Column("character varying", { name: "city", nullable: true, length: 50 })
  city: string | null;

  @Column("character varying", { name: "state", nullable: true, length: 2 })
  state: string | null;

  @Column("character varying", { name: "zip_code", nullable: true, length: 10 })
  zipCode: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @OneToMany(
    () => TeacherLoginCredentials,
    (teacherLoginCredentials) => teacherLoginCredentials.teacher
  )
  teacherLoginCredentials: TeacherLoginCredentials[];



  @OneToMany(
    () => TeacherProfiles,
    (teacherProfiles) => teacherProfiles.teacher
  )
  teacherProfiles: TeacherProfiles[];

  @OneToMany(() => Teacheruploads, (teacheruploads) => teacheruploads.teacher)
  teacheruploads: Teacheruploads[];
}
