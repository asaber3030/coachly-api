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
exports.Workout = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const workout_excecies_entity_1 = require("./workout-excecies.entity");
const workout_group_entity_1 = require("./workout-group.entity");
let Workout = class Workout extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, isGlobal: { required: true, type: () => Boolean }, createdBy: { required: false, type: () => require("./user.entity").User }, picture: { required: false, type: () => String }, video: { required: false, type: () => String }, group: { required: true, type: () => require("./workout-group.entity").WorkoutGroup }, exercises: { required: true, type: () => [require("./workout-excecies.entity").WorkoutExercise] } };
    }
};
exports.Workout = Workout;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Workout.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Workout.prototype, "isGlobal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Workout.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Workout.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Workout.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workout_group_entity_1.WorkoutGroup, (group) => group.workout, {
        nullable: true,
    }),
    __metadata("design:type", workout_group_entity_1.WorkoutGroup)
], Workout.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workout_excecies_entity_1.WorkoutExercise, (item) => item.workout, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Workout.prototype, "exercises", void 0);
exports.Workout = Workout = __decorate([
    (0, typeorm_1.Entity)('workouts')
], Workout);
//# sourceMappingURL=workout.entity.js.map