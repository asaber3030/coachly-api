import { Entity, ManyToOne, Column, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { BaseEntity } from "./base.entity";

@Entity('coach_clients')
export class CoachClient extends BaseEntity {
 
  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  coach!: User;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  client!: User;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn()
  startedAt!: Date;
}
