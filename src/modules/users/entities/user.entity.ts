import { Column, Entity, Index } from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from '../../../common/decorators/roles.decorator';

@Entity('users')
export class User extends BaseEntity {
  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  // Excluded from any response serialized via ClassSerializerInterceptor / class-transformer
  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  // Hashed refresh token, used to validate/revoke refresh tokens (null = logged out)
  @Exclude()
  @Column({ nullable: true, type: 'text' })
  hashedRefreshToken?: string | null;
}
