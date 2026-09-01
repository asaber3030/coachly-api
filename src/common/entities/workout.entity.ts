import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Exercise } from './excersie.entity';
import { User } from './user.entity';
import { WorkoutExercise } from './workout-excecies.entity';
import { WorkoutGroup } from './workout-group.entity';


@Entity('workouts')
export class Workout extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    default: false,
  })
  isGlobal!: boolean;

  @ManyToOne(() => User, {
    nullable: true,
  })
  createdBy?: User;

  @Column({
    nullable: true,
  })
  picture?: string;

  @Column({
    nullable: true,
  })
  video?: string;

  @ManyToOne(() => WorkoutGroup, (group) => group.workout, {
    nullable: true,
  })
  group!: WorkoutGroup;

  @OneToMany(() => WorkoutExercise, (item) => item.workout, {
    cascade: true,
  })
  exercises!: WorkoutExercise[];
}

