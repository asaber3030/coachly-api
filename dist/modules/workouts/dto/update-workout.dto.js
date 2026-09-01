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
exports.UpdateWorkoutDto = exports.WorkoutExerciseItemUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class WorkoutExerciseItemUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { exerciseId: { required: false, type: () => String }, sets: { required: false, type: () => Number, minimum: 1 }, reps: { required: false, type: () => Number, minimum: 1 }, weight: { required: false, type: () => Number }, restSeconds: { required: false, type: () => Number, minimum: 0 } };
    }
}
exports.WorkoutExerciseItemUpdateDto = WorkoutExerciseItemUpdateDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], WorkoutExerciseItemUpdateDto.prototype, "exerciseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], WorkoutExerciseItemUpdateDto.prototype, "sets", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], WorkoutExerciseItemUpdateDto.prototype, "reps", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WorkoutExerciseItemUpdateDto.prototype, "weight", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], WorkoutExerciseItemUpdateDto.prototype, "restSeconds", void 0);
class UpdateWorkoutDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, picture: { required: false, type: () => String }, video: { required: false, type: () => String }, isGlobal: { required: false, type: () => Boolean }, exercises: { required: false, type: () => [require("./update-workout.dto").WorkoutExerciseItemUpdateDto] } };
    }
}
exports.UpdateWorkoutDto = UpdateWorkoutDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutDto.prototype, "picture", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkoutDto.prototype, "video", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateWorkoutDto.prototype, "isGlobal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => WorkoutExerciseItemUpdateDto),
    __metadata("design:type", Array)
], UpdateWorkoutDto.prototype, "exercises", void 0);
//# sourceMappingURL=update-workout.dto.js.map