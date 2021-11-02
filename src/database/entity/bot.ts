import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Bug, User } from './index';

@Entity()
export class Bot extends BaseEntity {
	@PrimaryColumn('varchar', { length: 20 })
	public id: string;

	@Column('varchar', { length: 20 })
	public userId: string;

	@Column('varchar', { 'length': 2000, 'default': 'No description provided.' })
	public description: string;

	@Column('varchar', { 'length': 20, 'array': true, 'default': [] })
	public otherDeveloppers: string[];

	@Column('varchar', { length: 50, nullable: true })
	public supportServer?: string;

	@Column('varchar', { length: 50, nullable: true })
	public website?: string;

	@ManyToOne(type => User, user => user.bots, { lazy: true })
	@JoinColumn({ name: 'userId' })
	public user: Promise<User>;

	@OneToMany(type => Bug, bug => bug.bot, { lazy: true, cascade: true })
	public bugs: Promise<Bug[]>;
}
