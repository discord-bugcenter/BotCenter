import {Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn, OneToMany} from "typeorm";
import { Bug, User } from ".";

@Entity()
export class Bot extends BaseEntity {
    @PrimaryColumn('varchar', {length: 20})
    id: string;

    @Column('varchar', {length: 20})
    userId: string;

    @Column('varchar', { length: 2000, default: 'No description provided.'})
    description: string;

    @Column('varchar', {length: 20, array: true, default: []})
    otherDeveloppers: string[];

    @Column('varchar', {length: 50, nullable: true})
    supportServer?: string;

    @Column('varchar', {length: 50, nullable: true})
    website?: string;

    @ManyToOne(type => User, user => user.bots)
    @JoinColumn({name: 'userId'})
    user: User;

    @OneToMany(type => Bug, bug => bug.bot)
    bugs: Bug[];
}
