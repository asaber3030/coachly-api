"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const client_diet_assignment_entity_1 = require("../../common/entities/client-diet-assignment.entity");
const client_exercise_assignment_entity_1 = require("../../common/entities/client-exercise-assignment.entity");
const client_meal_assignment_entity_1 = require("../../common/entities/client-meal-assignment.entity");
const client_workout_assignment_entity_1 = require("../../common/entities/client-workout-assignment.entity");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const diet_entity_1 = require("../../common/entities/diet.entity");
const excersie_entity_1 = require("../../common/entities/excersie.entity");
const invitation_entity_1 = require("../../common/entities/invitation.entity");
const meal_entity_1 = require("../../common/entities/meal.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const workout_entity_1 = require("../../common/entities/workout.entity");
const roles_guard_1 = require("../../common/guards/roles.guard");
const coach_controller_1 = require("./coach.controller");
const coach_service_1 = require("./coach.service");
let CoachModule = class CoachModule {
};
exports.CoachModule = CoachModule;
exports.CoachModule = CoachModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                invitation_entity_1.Invitation,
                user_entity_1.User,
                coach_client_entity_1.CoachClient,
                workout_entity_1.Workout,
                excersie_entity_1.Exercise,
                meal_entity_1.Meal,
                diet_entity_1.Diet,
                client_workout_assignment_entity_1.ClientWorkoutAssignment,
                client_exercise_assignment_entity_1.ClientExerciseAssignment,
                client_meal_assignment_entity_1.ClientMealAssignment,
                client_diet_assignment_entity_1.ClientDietAssignment,
            ]),
        ],
        controllers: [coach_controller_1.CoachController],
        providers: [coach_service_1.CoachService, roles_guard_1.RolesGuard],
        exports: [coach_service_1.CoachService],
    })
], CoachModule);
//# sourceMappingURL=coach.module.js.map