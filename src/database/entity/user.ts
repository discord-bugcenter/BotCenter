import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import { Client } from ".";

@Entity()
export class User extends BaseEntity {

    @PrimaryColumn('varchar', { length: 20 })
    userId: string;
    
    @Column('varchar', { length: 2000, default: "No description provided." })
    description: string;
    
    @Column('real', { default: 0 })
    credits: number;
    
    @Column('integer', { default: 0 })
    messagesNumber: number;

    @Column('integer', { default: 0 })
    experience: number;
    
    @Column('real', { default: 0.0 })
    donation: number;
    
    @Column('smallint', { default: 0 })
    reputation: number;
    
    @OneToOne(type => Client, client => client.user, { eager: true })
    client?: Client
}
