import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export class Counter extends BaseEntity {
	@PrimaryGeneratedColumn({ type: 'bigint' })
	public id: bigint;

	@Column('varchar', { length: 20 })
	public userId: string;

	@Column('integer')
	public number: number;
}
