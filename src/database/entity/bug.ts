import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { Bot } from ".";

@Entity()
export class Bug extends BaseEntity {
    @PrimaryGeneratedColumn({type: 'bigint'})
    id: bigint;

    @Column('varchar', {length: 20})
    botId: string;

    @Column('varchar', {length: 2000})
    description: string;

    @CreateDateColumn()
    date: Date;

    @Column('varchar', {length: 20})
    verificatorId: string;

    @ManyToOne(type => Bot, bot => bot.bugs)
    @JoinColumn({name: 'botId'})
    bot: Bot;
}
