import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Workout } from './workout.entity';

@Entity('client_workout_assignments')
export class ClientWorkoutAssignment extends BaseEntity {
  @ManyToOne(() => CoachClient, { onDelete: 'CASCADE' })
  coachClient!: CoachClient;

  @ManyToOne(() => Workout, { onDelete: 'CASCADE' })
  workout!: Workout;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
