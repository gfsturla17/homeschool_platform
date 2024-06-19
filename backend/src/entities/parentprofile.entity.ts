import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Parent } from "./parent.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class ParentProfile {
  @PrimaryGeneratedColumn()
  @AutoMap()
  parentProfileId: number;

  @Column({ nullable: true })
  @AutoMap()
  biography: string;

  @Column({ nullable: true })
  @AutoMap()
  profilePictureUrl: string;

  @OneToOne(() => Parent, (parent) => parent.profile)
  @JoinColumn({ name: 'parent_id', referencedColumnName:'parentId', foreignKeyConstraintName: 'fk_parent_profile_parent'})
  @AutoMap()
  parent: Parent;
}