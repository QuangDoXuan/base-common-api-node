import {
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Column,
  } from 'typeorm';
  
  @Entity('config')
  
  export class Config {
  
    @PrimaryGeneratedColumn()
    @PrimaryColumn('int')
    id: number;
  
    @Column({
      type: "nvarchar",
      length: '300',
      nullable: false
    })
    key: string;
  
    @Column({
      type: "text",
    })
    value: string;
  
    @Column({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP"
    })
    createdAt: Date;
  
    @Column({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP"
    })
    updatedAt: Date;
  
  }
  