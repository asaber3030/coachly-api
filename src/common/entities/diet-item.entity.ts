import { Entity, Column, ManyToOne } from 'typeorm';
import { Diet } from './diet.entity';
import { Meal } from './meal.entity';
import { BaseEntity } from './base.entity';

@Entity('diet_items')
export class DietItem extends BaseEntity {
  @Column()
  dayOfWeek!: number;

  @Column()
  mealTime!: string;

  @ManyToOne(() => Diet, (diet) => diet.items, {
    onDelete: 'CASCADE',
  })
  diet!: Diet;

  @ManyToOne(() => Meal)
  meal!: Meal;
}
