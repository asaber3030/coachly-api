import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('recipes')
export class Recipe extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  instructions?: string;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  calories?: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  protein?: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  carbs?: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  fats?: number;

  @Column({
    default: false,
  })
  isGlobal!: boolean;

  @ManyToOne(() => User, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  createdBy?: User;
}
