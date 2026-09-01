import { Entity, Column, OneToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserRoleEnum } from '../enums/user.enum';
import { Invitation } from './invitation.entity';
import { UserProfile } from './user-profile.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER,
  })
  role!: UserRoleEnum;

  @Column({
    default: true,
  })
  isActive!: boolean;

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    cascade: true,
  })
  profile!: UserProfile;

  @OneToMany(() => Invitation, (invitation) => invitation.coach)
  sentInvitations!: Invitation[];

  @OneToMany(() => Invitation, (invitation) => invitation.user)
  receivedInvitations!: Invitation[];
}
