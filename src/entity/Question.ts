import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
    OneToMany,
    ManyToOne
  } from 'typeorm';
import { Category } from './Category';
import { Lesson } from './Lesson';
import { Answer } from './Answer';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'nvarchar',
    length: '255',
    nullable: false,
  })
  title: string;
  
  @Column({
    type: 'varchar',
    length: '1000',
    nullable: true,
  })
  image: string;

  @Column({
    type: 'varchar',
    length: '1000',
    nullable: true,
  })
  video: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  question_type: number;
  
  @ManyToOne(() => Lesson, lesson => lesson.questions)
  lesson: Lesson;

  @OneToMany(() => Answer, answer => answer.question)
  answers: Answer[];
}
