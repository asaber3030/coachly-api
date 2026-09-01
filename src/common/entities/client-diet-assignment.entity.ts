import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Diet } from './diet.entity';

@Entity('client_diet_assignments')
export class ClientDietAssignment extends BaseEntity {
  @ManyToOne(() => CoachClient, { onDelete: 'CASCADE' })
  coachClient!: CoachClient;

  @ManyToOne(() => Diet, { onDelete: 'CASCADE' })
  diet!: Diet;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'text', nullable: true })
  notes?: string;
}
