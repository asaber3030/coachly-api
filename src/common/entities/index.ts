import { Admin } from './admin.entity';
import { BodyMeasurement } from './body-measurement.entity';
import { ClientDietAssignment } from './client-diet-assignment.entity';
import { ClientExerciseAssignment } from './client-exercise-assignment.entity';
import { ClientMealAssignment } from './client-meal-assignment.entity';
import { ClientWorkoutAssignment } from './client-workout-assignment.entity';
import { CoachClient } from './coach-client.entity';
import { Diet } from './diet.entity';
import { DietItem } from './diet-item.entity';
import { Exercise } from './excersie.entity';
import { ExerciseGroup } from './execrsie-group.entity';
import { Invitation } from './invitation.entity';
import { Meal } from './meal.entity';
import { Progress } from './progress.entity';
import { ProgressPhoto } from './progress-photo.entity';
import { Recipe } from './recipe.entity';
import { User } from './user.entity';
import { UserProfile } from './user-profile.entity';
import { Workout } from './workout.entity';
import { WorkoutExercise } from './workout-excecies.entity';
import { WorkoutGroup } from './workout-group.entity';

export const ENTITIES = [
  User,
  UserProfile,
  Admin,
  Invitation,
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
  ClientWorkoutAssignment,
  ClientExerciseAssignment,
  ClientMealAssignment,
  ClientDietAssignment,
  Progress,
  ProgressPhoto,
  BodyMeasurement,
];
