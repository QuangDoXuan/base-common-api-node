import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
    ManyToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
import { Category } from './Category';
import { Question } from './Question';

@Entity('lessons')
export class Lesson {
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
  
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @OneToMany(() => Question, question => question.lesson)
  questions: Question[];
}
