import { Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity('user_profiles')
export class UserProfile extends BaseEntity {
  @Column({ nullable: true })
  phone?: string;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    nullable: true,
  })
  height?: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate?: Date;

  @Column({
    nullable: true,
  })
  gender?: string;

  @Column({
    nullable: true,
  })
  avatar?: string;

  @Column({
    nullable: true,
  })
  goal?: string;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: User;
}
