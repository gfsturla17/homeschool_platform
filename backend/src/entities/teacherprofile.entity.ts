import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Teacher } from "./teacher.entity";

@Entity()
export class TeacherProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Teacher, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  teacher!: Teacher;

  @Column({ nullable: true })
  address!: string;

  @Column({ nullable: true })
  city!: string;

  @Column({ nullable: true })
  state!: string;

  @Column({ nullable: true })
  biography!: string;

  @Column({ nullable: true })
  profilePictureUrl!: string;

  @Column({ nullable: true })
  tiktokLink!: string;

  @Column({ nullable: true })
  twitterLink!: string;

  @Column({ nullable: true })
  facebookLink!: string;

  @Column({ nullable: true })
  instagramLink!: string;
}
