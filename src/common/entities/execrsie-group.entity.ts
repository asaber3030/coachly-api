import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('exercise_groups')
export class ExerciseGroup extends BaseEntity {
  @Column()
  name!: string;

  @ManyToOne(() => User, {
    nullable: true,
  })
  createdBy?: User;
}
