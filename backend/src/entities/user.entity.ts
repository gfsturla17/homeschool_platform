import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, Unique } from "typeorm";
import { UserRole } from "./userrole.entity";
import { Address } from "./address.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
@Unique('user_email_uq', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @Column()
  @AutoMap()
  firstName: string;

  @Column()
  @AutoMap()
  lastName: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  @AutoMap()
  userRoles: UserRole[];

  @OneToOne(() => Address, (address) => address.user)
  @JoinColumn({ name: 'user_address_id_fk' })
  @AutoMap()
  address: Address;
}

