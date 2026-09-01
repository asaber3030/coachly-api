import { Entity, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('progress')
export class Progress extends BaseEntity {
  @Column({
    type: 'decimal',
    nullable: true,
  })
  weight?: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  bodyFat?: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  muscleMass?: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes?: string;

  @Column({
    type: 'date',
  })
  date!: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user!: User;
}
