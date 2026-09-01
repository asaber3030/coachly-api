import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('admins')
export class Admin extends BaseEntity {
  @Column()
  name!: string;

  @Column({
    unique: true,
  })
  email!: string;

  @Column({
    select: false,
  })
  password!: string;

  @Column({
    default: true,
  })
  isActive!: boolean;
}
