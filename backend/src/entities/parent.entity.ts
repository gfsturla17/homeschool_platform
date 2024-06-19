// src/users/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { ParentProfile } from "./parentprofile.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Parent {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  firstName: string;

  @Column()
  @AutoMap()
  lastName: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'parent_user_id_fk' })
  @AutoMap()
  user: User;

  @Column()
  @AutoMap()
  userId: number;

  @OneToOne(() => ParentProfile, (profile) => profile.parent)
  @JoinColumn({ name: 'parent_profile_id_fk' })
  @AutoMap()
  profile: ParentProfile;
}
