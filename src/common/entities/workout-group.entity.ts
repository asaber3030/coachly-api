import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Workout } from './workout.entity';

@Entity('workouts_groups')
export class WorkoutGroup extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  picture?: string;

  @Column({
    nullable: true,
  })
  video?: string;

  @ManyToOne(() => Workout, (workout) => workout.group, {
    onDelete: 'CASCADE',
  })
  workout!: Workout;
}
