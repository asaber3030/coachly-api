import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';
import { ExerciseGroup } from './execrsie-group.entity';

@Entity('exercises')
export class Exercise extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    nullable: true,
  })
  muscleGroup?: string;

  @Column({
    nullable: true,
  })
  equipment?: string;

  @Column({
    nullable: true,
  })
  picture?: string;

  @Column({
    nullable: true,
  })
  video?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  instructions?: string;

  @Column({
    default: false,
  })
  isGlobal!: boolean;

  @ManyToOne(() => ExerciseGroup, {
    nullable: true,
  })
  group?: ExerciseGroup;

  @ManyToOne(() => User, {
    nullable: true,
  })
  createdBy?: User;
}
