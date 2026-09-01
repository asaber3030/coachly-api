import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { ProgressPhoto } from '@app/common/entities/progress-photo.entity';
import { User } from '@app/common/entities/user.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { ProgressPhotosController } from './progress-photos.controller';
import { ProgressPhotosService } from './progress-photos.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgressPhoto, User, CoachClient])],
  controllers: [ProgressPhotosController],
  providers: [ProgressPhotosService, RolesGuard],
  exports: [ProgressPhotosService],
})
export class ProgressPhotosModule {}
