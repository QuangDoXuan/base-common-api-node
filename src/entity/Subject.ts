import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    PrimaryColumn,
    OneToOne,
    OneToMany,
    JoinColumn
  } from 'typeorm';
import { Category } from './Category'
@Entity('subjects')
export class Subject {
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

  @Column({
    type:'int',
    nullable: true
  })
  subject_id: number

  @OneToMany(() => Category, category => category.subject)
  categories: Category[];
}