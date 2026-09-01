import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

/**
 * Extend this in every entity to get a UUID primary key + timestamps + soft-delete for free.
 */
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
