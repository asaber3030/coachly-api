import { Entity, Column, ManyToMany, JoinTable, ManyToOne, CreateDateColumn } from 'typeorm';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('meals')
export class Meal extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    default: false,
  })
  isGlobal!: boolean;

  @ManyToMany(() => Recipe)
  @JoinTable({
    name: 'meal_recipes',
  })
  recipes!: Recipe[];

  @ManyToOne(() => User, {
    nullable: true,
  })
  createdBy?: User;
}
