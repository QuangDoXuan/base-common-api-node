import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
    ManyToOne,
    OneToMany
  } from 'typeorm';
import { Lesson } from './Lesson';
import { Subject } from './Subject';
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'nvarchar',
    length: '255',
    nullable: true,
  })
  title: string;
  
  @Column({
    type: 'varchar',
    length: '1000',
    nullable: true,
  })
  image: string;
  
  @ManyToOne(() => Subject, subject => subject.categories)
  subject: Subject;

  @OneToMany(() => Lesson, (lesson) => lesson.category)
  lessons: Lesson[];
}
