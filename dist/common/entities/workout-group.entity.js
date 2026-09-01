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
exports.WorkoutGroup = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const workout_entity_1 = require("./workout.entity");
let WorkoutGroup = class WorkoutGroup extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, picture: { required: false, type: () => String }, video: { required: false, type: () => String }, workout: { required: true, type: () => require("./workout.entity").Workout } };
    }
};
exports.WorkoutGroup = WorkoutGroup;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WorkoutGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], WorkoutGroup.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], WorkoutGroup.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workout_entity_1.Workout, (workout) => workout.group, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", workout_entity_1.Workout)
], WorkoutGroup.prototype, "workout", void 0);
exports.WorkoutGroup = WorkoutGroup = __decorate([
    (0, typeorm_1.Entity)('workouts_groups')
], WorkoutGroup);
//# sourceMappingURL=workout-group.entity.js.map