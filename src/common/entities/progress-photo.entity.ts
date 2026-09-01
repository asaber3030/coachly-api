import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity('progress_photos')
export class ProgressPhoto extends BaseEntity {
  @Column()
  imageUrl!: string;

  @Column({
    nullable: true,
  })
  description?: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
  })
  user!: User;
}
