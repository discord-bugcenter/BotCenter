import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Counter extends BaseEntity {

    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint;

    @Column('varchar', {length: 20})
    userId: string;

    @Column('integer')
    number: number;
}
