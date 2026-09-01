import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { Progress } from '@app/common/entities/progress.entity';
import { User } from '@app/common/entities/user.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { ProgressController } from './progress.controller';
import { ProgressService } from './progress.service';

@Module({
  imports: [TypeOrmModule.forFeature([Progress, User, CoachClient])],
  controllers: [ProgressController],
  providers: [ProgressService, RolesGuard],
  exports: [ProgressService],
})
export class ProgressModule {}
