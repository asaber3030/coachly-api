"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITIES = void 0;
const admin_entity_1 = require("./admin.entity");
const body_measurement_entity_1 = require("./body-measurement.entity");
const client_diet_assignment_entity_1 = require("./client-diet-assignment.entity");
const client_exercise_assignment_entity_1 = require("./client-exercise-assignment.entity");
const client_meal_assignment_entity_1 = require("./client-meal-assignment.entity");
const client_workout_assignment_entity_1 = require("./client-workout-assignment.entity");
const coach_client_entity_1 = require("./coach-client.entity");
const diet_entity_1 = require("./diet.entity");
const diet_item_entity_1 = require("./diet-item.entity");
const excersie_entity_1 = require("./excersie.entity");
const execrsie_group_entity_1 = require("./execrsie-group.entity");
const invitation_entity_1 = require("./invitation.entity");
const meal_entity_1 = require("./meal.entity");
const progress_entity_1 = require("./progress.entity");
const progress_photo_entity_1 = require("./progress-photo.entity");
const recipe_entity_1 = require("./recipe.entity");
const user_entity_1 = require("./user.entity");
const user_profile_entity_1 = require("./user-profile.entity");
const workout_entity_1 = require("./workout.entity");
const workout_excecies_entity_1 = require("./workout-excecies.entity");
const workout_group_entity_1 = require("./workout-group.entity");
exports.ENTITIES = [
    user_entity_1.User,
    user_profile_entity_1.UserProfile,
    admin_entity_1.Admin,
    invitation_entity_1.Invitation,
    recipe_entity_1.Recipe,
    meal_entity_1.Meal,
    diet_entity_1.Diet,
    diet_item_entity_1.DietItem,
    workout_group_entity_1.WorkoutGroup,
    execrsie_group_entity_1.ExerciseGroup,
    excersie_entity_1.Exercise,
    workout_entity_1.Workout,
    workout_excecies_entity_1.WorkoutExercise,
    coach_client_entity_1.CoachClient,
    client_workout_assignment_entity_1.ClientWorkoutAssignment,
    client_exercise_assignment_entity_1.ClientExerciseAssignment,
    client_meal_assignment_entity_1.ClientMealAssignment,
    client_diet_assignment_entity_1.ClientDietAssignment,
    progress_entity_1.Progress,
    progress_photo_entity_1.ProgressPhoto,
    body_measurement_entity_1.BodyMeasurement,
];
//# sourceMappingURL=index.js.map