import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientDietAssignment } from '@app/common/entities/client-diet-assignment.entity';
import { ClientExerciseAssignment } from '@app/common/entities/client-exercise-assignment.entity';
import { ClientMealAssignment } from '@app/common/entities/client-meal-assignment.entity';
import { ClientWorkoutAssignment } from '@app/common/entities/client-workout-assignment.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { Diet } from '@app/common/entities/diet.entity';
import { Exercise } from '@app/common/entities/excersie.entity';
import { Invitation } from '@app/common/entities/invitation.entity';
import { Meal } from '@app/common/entities/meal.entity';
import { User } from '@app/common/entities/user.entity';
import { Workout } from '@app/common/entities/workout.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { CoachController } from './coach.controller';
import { CoachService } from './coach.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invitation,
      User,
      CoachClient,
      Workout,
      Exercise,
      Meal,
      Diet,
      ClientWorkoutAssignment,
      ClientExerciseAssignment,
      ClientMealAssignment,
      ClientDietAssignment,
    ]),
  ],
  controllers: [CoachController],
  providers: [CoachService, RolesGuard],
  exports: [CoachService],
})
export class CoachModule {}
