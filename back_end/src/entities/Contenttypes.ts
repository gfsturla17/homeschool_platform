import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Teacheruploads } from "./Teacheruploads";

@Index("contenttypes_pkey", ["contenttypeid"], { unique: true })
@Entity("contenttypes", { schema: "dbo" })
export class Contenttypes {
  @Column("integer", { primary: true, name: "contenttypeid" })
  contenttypeid: number;

  @Column("character varying", { name: "contenttypename", length: 50 })
  contenttypename: string;

  @OneToMany(
    () => Teacheruploads,
    (teacheruploads) => teacheruploads.contenttype
  )
  teacheruploads: Teacheruploads[];
}
