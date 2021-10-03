import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Counter extends BaseEntity {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: bigint;

    @Column('varchar', { length: 18 })
    userId: string;

    @Column('integer')
    number: number;
}
