import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  address: string;

  @Column()
  @AutoMap()
  city: string;

  @Column()
  @AutoMap()
  state: string;

  @Column()
  @AutoMap()
  latitude: number;

  @Column()
  @AutoMap()
  longitude: number;

  @OneToOne(() => User, (user) => user.address)
  @JoinColumn({ name: 'user_address_id_fk' })
  @AutoMap()
  user: User;
}