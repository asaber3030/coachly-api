import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Meal } from './meal.entity';

@Entity('client_meal_assignments')
export class ClientMealAssignment extends BaseEntity {
  @ManyToOne(() => CoachClient, { onDelete: 'CASCADE' })
  coachClient!: CoachClient;

  @ManyToOne(() => Meal, { onDelete: 'CASCADE' })
  meal!: Meal;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
