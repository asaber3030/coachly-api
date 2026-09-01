import { Subscription } from 'rxjs';
import { Admin } from 'typeorm';
import { BodyMeasurement } from './body-measurement.entity';
import { CoachClient } from './coach-client.entity';
import { Diet } from './diet.entity';
import { Exercise } from './excersie.entity';
import { Invitation } from './invitation.entity';
import { Meal } from './meal.entity';
import { Progress } from './progress.entity';
import { Recipe } from './recipe.entity';
import { UserProfile } from './user-profile.entity';
import { User } from './user.entity';
import { WorkoutExercise } from './workout-excecies.entity';
import { Workout } from './workout.entity';
import { DietItem } from './diet-item.entity';
import { WorkoutGroup } from './workout-group.entity';
import { ExerciseGroup } from './execrsie-group.entity';
import { ProgressPhoto } from './progress-photo.entity';

export const ENTITIES = [
  User,
  UserProfile,

  Admin,

  Invitation,
  Subscription,

  Recipe,
  Meal,

  Diet,
  DietItem,
  
  WorkoutGroup,
  ExerciseGroup,

  Exercise,
  Workout,

  WorkoutExercise,

  CoachClient,

  Progress,
  ProgressPhoto,
  BodyMeasurement,
];
