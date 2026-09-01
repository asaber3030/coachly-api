import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity('body_measurements')
export class BodyMeasurement extends BaseEntity {
  @Column({ type: 'decimal', nullable: true })
  chest?: number;

  @Column({ type: 'decimal', nullable: true })
  waist?: number;

  @Column({ type: 'decimal', nullable: true })
  hips?: number;

  @Column({ type: 'decimal', nullable: true })
  arms?: number;

  @Column({ type: 'decimal', nullable: true })
  thighs?: number;

  @Column({
    type: 'date',
  })
  date!: Date;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user!: User;
}
