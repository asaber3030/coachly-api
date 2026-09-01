"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutExercise = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const excersie_entity_1 = require("./excersie.entity");
const workout_entity_1 = require("./workout.entity");
let WorkoutExercise = class WorkoutExercise extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { sets: { required: true, type: () => Number }, reps: { required: true, type: () => Number }, weight: { required: false, type: () => Number }, restSeconds: { required: false, type: () => Number }, workout: { required: true, type: () => require("./workout.entity").Workout }, exercise: { required: true, type: () => require("./excersie.entity").Exercise } };
    }
};
exports.WorkoutExercise = WorkoutExercise;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkoutExercise.prototype, "sets", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], WorkoutExercise.prototype, "reps", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], WorkoutExercise.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], WorkoutExercise.prototype, "restSeconds", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workout_entity_1.Workout, (workout) => workout.exercises, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", workout_entity_1.Workout)
], WorkoutExercise.prototype, "workout", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => excersie_entity_1.Exercise),
    __metadata("design:type", excersie_entity_1.Exercise)
], WorkoutExercise.prototype, "exercise", void 0);
exports.WorkoutExercise = WorkoutExercise = __decorate([
    (0, typeorm_1.Entity)('workout_exercises')
], WorkoutExercise);
//# sourceMappingURL=workout-excecies.entity.js.map