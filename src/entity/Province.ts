import {
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    Column,
} from 'typeorm';

@Entity('province')

export class Province {
    @PrimaryGeneratedColumn()
    @PrimaryColumn('int')
    id: number;

    @Column({ type: 'nvarchar' })
    name: string;

    @Column({ type: 'nvarchar' })
    kenFuri: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
    
}