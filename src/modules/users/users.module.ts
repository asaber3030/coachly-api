import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '@app/common/entities/user.entity';
import { UserProfile } from '@app/common/entities/user-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
    User, 
    UserProfile
  ])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
