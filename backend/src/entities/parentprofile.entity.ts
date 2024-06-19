import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parent } from "./parent.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class ParentProfile {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ nullable: true })
  @AutoMap()
  biography: string;

  @Column({ nullable: true })
  @AutoMap()
  profilePictureUrl: string;

  @OneToOne(() => Parent, (parent) => parent.profile)
  @JoinColumn({ name: 'parent_profile_id_fk' })
  @AutoMap()
  parent: Parent;
}