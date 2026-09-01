import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exercise } from './excersie.entity';
import { Workout } from './workout.entity';

@Entity('workout_exercises')
export class WorkoutExercise extends BaseEntity {
  @Column()
  sets!: number;

  @Column()
  reps!: number;

  @Column({
    nullable: true,
  })
  weight?: number;

  @Column({
    nullable: true,
  })
  restSeconds?: number;

  @ManyToOne(() => Workout, (workout) => workout.exercises, {
    onDelete: 'CASCADE',
  })
  workout!: Workout;

  @ManyToOne(() => Exercise)
  exercise!: Exercise;
}
