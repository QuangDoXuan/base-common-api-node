import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  PrimaryColumn,
  OneToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { float } from 'aws-sdk/clients/lightsail';
import { Province } from './Province';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'nvarchar',
    length: '300',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'nvarchar',
    length: '300',
    nullable: false
  })
  email: string;

  @Column({
    type: 'nvarchar',
    length: '300',
    nullable: false,
  })
  password: string;

  @Column({
    type: 'nvarchar',
    length: 'MAX',
    nullable: false
  })
  avatar: string;

  @Column({
    type: 'varchar',
    length: '100',
    nullable: false,
  })
  phone: string;

  @Column({
    type: "nvarchar",
    length: '3000',
    nullable: false
  })
  address: string;

  @Column({
    type: 'int',
    default: 0
  })
  signUpBy: number;

  @Column({
    type: 'nvarchar',
    length: '3000',
    nullable: false
  })
  verifyToken: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  notification: boolean;

  @Column({
    type: 'int',
  })
  role: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  status: number;

  @Column({
    type: 'timestamp',
  })
  lastLogin: Date;
  
  @Column({
    type:'int',
    nullable: false
  })
  provinceId: number
 
  @OneToOne(type => Province)
    @JoinColumn()
    province: Province;

  @Column({
    type: 'nvarchar',
    length: 300
  })
  openId: string

  @Column({
    type: 'int',
    default: 0
  })
  loginType: number;

  @Column({
    type: 'boolean',
    default: false
  })
  softDelete: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
  })
  expiredToken: Date;
}
