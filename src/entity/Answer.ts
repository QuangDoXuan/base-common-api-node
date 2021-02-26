import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
    ManyToOne
  } from 'typeorm';
import { Category } from './Category';
import { Lesson } from './Lesson';
import { Question } from './Question';

@Entity('answers')
export class Answer {
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
  answer_type: number;
  
  @ManyToOne(() => Question, question => question.answers)
  question: Question;
}
