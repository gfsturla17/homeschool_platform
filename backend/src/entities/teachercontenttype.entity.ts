import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TeacherContentType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['Ebook', 'Video Tutorial', 'Lesson Plan', 'Worksheet'],
  })
  contentType: string;
}