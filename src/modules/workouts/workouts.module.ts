import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { User } from '@app/common/entities/user.entity';
import { Workout } from '@app/common/entities/workout.entity';
import { WorkoutExercise } from '@app/common/entities/workout-excecies.entity';
import { Exercise } from '@app/common/entities/excersie.entity';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, WorkoutExercise, Exercise, User])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService, RolesGuard],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
