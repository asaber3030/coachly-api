import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '@app/common/entities/excersie.entity';
import { ExerciseGroup } from '@app/common/entities/execrsie-group.entity';
import { User } from '@app/common/entities/user.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseGroup, User])],
  controllers: [ExercisesController],
  providers: [ExercisesService, RolesGuard],
  exports: [ExercisesService],
})
export class ExercisesModule {}
