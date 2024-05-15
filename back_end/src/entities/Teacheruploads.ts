import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contenttypes } from "./Contenttypes";
import { Teachers } from "./Teachers";

@Index("teacheruploads_pkey", ["uploadid"], { unique: true })
@Entity("teacheruploads", { schema: "dbo" })
export class Teacheruploads {
  @PrimaryGeneratedColumn({ type: "integer", name: "uploadid" })
  uploadid: number;

  @Column("character varying", { name: "filepath", length: 255 })
  filepath: string;

  @Column("character varying", { name: "filedisplayname", length: 100 })
  filedisplayname: string;

  @ManyToOne(() => Contenttypes, (contenttypes) => contenttypes.teacheruploads)
  @JoinColumn([
    { name: "contenttypeid", referencedColumnName: "contenttypeid" },
  ])
  contenttype: Contenttypes;

  @ManyToOne(() => Teachers, (teachers) => teachers.teacheruploads)
  @JoinColumn([{ name: "teacherid", referencedColumnName: "teacherId" }])
  teacher: Teachers;
}
