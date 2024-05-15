import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Teachers } from "./Teachers";

@Index("teacher_profiles_pkey", ["profileId"], { unique: true })
@Entity("teacher_profiles", { schema: "dbo" })
export class TeacherProfiles {
  @PrimaryGeneratedColumn({ type: "integer", name: "profile_id" })
  profileId: number;

  @Column("text", { name: "bio", nullable: true })
  bio: string | null;

  @Column("bytea", { name: "profile_picture", nullable: true })
  profilePicture: Buffer | null;

  @Column("character varying", {
    name: "experience",
    nullable: true,
    length: 255,
  })
  experience: string | null;

  @Column("character varying", {
    name: "qualifications",
    nullable: true,
    length: 255,
  })
  qualifications: string | null;

  @ManyToOne(() => Teachers, (teachers) => teachers.teacherProfiles)
  @JoinColumn([{ name: "teacher_id", referencedColumnName: "teacherId" }])
  teacher: Teachers;
}
