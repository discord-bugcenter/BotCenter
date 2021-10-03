import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, JoinColumn, PrimaryColumn, OneToMany} from "typeorm";
import { Bot, User } from ".";

@Entity()
export class Client extends BaseEntity {

    @PrimaryColumn('varchar', { length: 20 })
    userId: string;

    @Column('varchar', { length: 2000, nullable: true })
    avis?: string;

    @Column('real', { nullable: true })
    note?: number;

    @OneToOne(type => User, user => user.client)
    @JoinColumn({ name: 'userId'})
    user: User

    @OneToMany(type => Bot, bot => bot.client, { eager: true })
    bots: Bot[];
}
