// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { ParentProfile } from "./parentprofile.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  @AutoMap()
  parentId: number

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id', foreignKeyConstraintName: 'fk_parent_user_id_fk' })
  @AutoMap()
  user: User;

  @OneToOne(() => ParentProfile, (profile) => profile.parent)
  @JoinColumn({ name: 'parentProfileId', referencedColumnName: 'parentProfileId', foreignKeyConstraintName: 'Fk_parent_parent_profile_id'})
  @AutoMap()
  profile: ParentProfile;
}
