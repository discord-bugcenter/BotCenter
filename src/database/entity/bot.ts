import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Client } from ".";

@Entity()
export class Bot extends BaseEntity {
    @Column('varchar', { length: 20, unique: true })
    id: string;

    @PrimaryColumn('varchar', { length: 20 })
    userId: string;

    @Column('varchar', { length: 2000, default: 'No description provided.' })
    description: string;

    @Column('varchar', { length: 20, array: true, default: [] })
    otherDeveloppers: string[];

    @Column('varchar', { length: 50, nullable: true })
    supportServer?: string;

    @Column('varchar', { length: 50, nullable: true })
    website?: string;

    @ManyToOne(type => Client, client => client.bots)
    @JoinColumn({ referencedColumnName: 'userId', name: 'id'})
    client: Client;
}
