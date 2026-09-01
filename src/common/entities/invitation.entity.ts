import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity('invitations')
export class Invitation extends BaseEntity {
  @Column({
    unique: true,
  })
  token!: string;

  @Column()
  email!: string;

  @Column({
    default: false,
  })
  isAccepted!: boolean;

  @Column({
    type: 'timestamp',
  })
  expiresAt!: Date;

  @ManyToOne(() => User, (user) => user.sentInvitations, {
    onDelete: 'CASCADE',
  })
  coach!: User;

  @ManyToOne(() => User, (user) => user.receivedInvitations, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  user?: User;
}
