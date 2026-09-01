import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { User } from '@app/common/entities/user.entity';
import { UserProfile } from '@app/common/entities/user-profile.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserProfile, CoachClient])],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard],
  exports: [UsersService],
})
export class UsersModule {}
