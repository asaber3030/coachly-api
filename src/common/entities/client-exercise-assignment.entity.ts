import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Exercise } from './excersie.entity';

@Entity('client_exercise_assignments')
export class ClientExerciseAssignment extends BaseEntity {
  @ManyToOne(() => CoachClient, { onDelete: 'CASCADE' })
  coachClient!: CoachClient;

  @ManyToOne(() => Exercise, { onDelete: 'CASCADE' })
  exercise!: Exercise;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
