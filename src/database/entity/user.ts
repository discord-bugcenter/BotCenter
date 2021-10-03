import {Entity, Column, BaseEntity, OneToOne, PrimaryColumn, OneToMany} from "typeorm";
import { Bot } from ".";

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn('varchar', {length: 20})
    id: string;
    
    @Column('varchar', {length: 2000, default: "No description provided."})
    description: string;
    
    @Column('real', {default: 0})
    credits: number;
    
    @Column('integer', {default: 0})
    messagesNumber: number;

    @Column('integer', {default: 0})
    experience: number;
    
    @Column('real', {default: 0.0})
    donation: number;
    
    @Column('smallint', {default: 0})
    reputation: number;

    @Column('smallint', {default: 5})
    pendingBugs: number;

    @Column('smallint', {default: 1})
    pendingBots: number;

    @Column('varchar', {length: 2000, nullable: true})
    avis?: string;

    @Column('real', {nullable: true})
    note?: number;
    
    @OneToMany(type => Bot, bot => bot.user, {eager: true})
    bots: Bot[];

    get client(): boolean {
        return this.bots.length > 0
    }
}
