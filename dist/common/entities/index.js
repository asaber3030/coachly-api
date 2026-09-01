"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENTITIES = void 0;
const rxjs_1 = require("rxjs");
const typeorm_1 = require("typeorm");
const body_measurement_entity_1 = require("./body-measurement.entity");
const coach_client_entity_1 = require("./coach-client.entity");
const diet_entity_1 = require("./diet.entity");
const excersie_entity_1 = require("./excersie.entity");
const invitation_entity_1 = require("./invitation.entity");
const meal_entity_1 = require("./meal.entity");
const progress_entity_1 = require("./progress.entity");
const recipe_entity_1 = require("./recipe.entity");
const user_profile_entity_1 = require("./user-profile.entity");
const user_entity_1 = require("./user.entity");
const workout_excecies_entity_1 = require("./workout-excecies.entity");
const workout_entity_1 = require("./workout.entity");
const diet_item_entity_1 = require("./diet-item.entity");
const workout_group_entity_1 = require("./workout-group.entity");
const execrsie_group_entity_1 = require("./execrsie-group.entity");
const progress_photo_entity_1 = require("./progress-photo.entity");
exports.ENTITIES = [
    user_entity_1.User,
    user_profile_entity_1.UserProfile,
    typeorm_1.Admin,
    invitation_entity_1.Invitation,
    rxjs_1.Subscription,
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
    progress_entity_1.Progress,
    progress_photo_entity_1.ProgressPhoto,
    body_measurement_entity_1.BodyMeasurement,
];
//# sourceMappingURL=index.js.map