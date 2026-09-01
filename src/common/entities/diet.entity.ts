import { Entity, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { DietItem } from './diet-item.entity';
import { BaseEntity } from './base.entity';

@Entity('diets')
export class Diet extends BaseEntity {
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
  user?: User;

  @ManyToOne(() => User, {
    nullable: true,
  })
  createdBy?: User;

  @OneToMany(() => DietItem, (item) => item.diet, {
    cascade: true,
  })
  items!: DietItem[];
}
