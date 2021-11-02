import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Bot } from './index';

@Entity()
export class Bug extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	public id: number;

	@Column('varchar', { length: 20 })
	public botId: string;

	@Column('varchar', { length: 2000 })
	public description: string;

	@CreateDateColumn()
	public date: Date;

	@Column('varchar', { length: 20 })
	public verificatorId: string;

	@ManyToOne(type => Bot, bot => bot.bugs, { lazy: true })
	@JoinColumn({ name: 'botId' })
	public bot: Promise<Bot>;
}
