import { Entity, Column, BaseEntity, PrimaryColumn, OneToMany } from 'typeorm';
import { Bot } from './index';

@Entity()
export class User extends BaseEntity {
	@PrimaryColumn('varchar', { length: 20 })
	public id: string;

	@Column('varchar', { 'length': 2000, 'default': 'No description provided.' })
	public description: string;

	@Column('real', { 'default': 0 })
	public credits: number;

	@Column('integer', { 'default': 0 })
	public messagesNumber: number;

	@Column('integer', { 'default': 0 })
	public experience: number;

	@Column('real', { 'default': 0.0 })
	public donation: number;

	@Column('smallint', { 'default': 0 })
	public reputation: number;

	@Column('smallint', { 'default': 5 })
	public pendingBugs: number;

	@Column('smallint', { 'default': 1 })
	public pendingBots: number;

	@Column('varchar', { length: 2000, nullable: true })
	public avis?: string;

	@Column('real', { nullable: true })
	public note?: number;

	@OneToMany(type => Bot, bot => bot.user, { lazy: true })
	public bots: Bot[];

	public get client(): boolean {
		return this.bots.length > 0;
	}
}
