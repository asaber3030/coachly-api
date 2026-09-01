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
exports.UpdateDietDto = exports.DietMealItemUpdateDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class DietMealItemUpdateDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { mealId: { required: false, type: () => String }, dayOfWeek: { required: false, type: () => Number, minimum: 1 }, mealTime: { required: false, type: () => String } };
    }
}
exports.DietMealItemUpdateDto = DietMealItemUpdateDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], DietMealItemUpdateDto.prototype, "mealId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], DietMealItemUpdateDto.prototype, "dayOfWeek", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DietMealItemUpdateDto.prototype, "mealTime", void 0);
class UpdateDietDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: false, type: () => String }, description: { required: false, type: () => String }, isGlobal: { required: false, type: () => Boolean }, items: { required: false, type: () => [require("./update-diet.dto").DietMealItemUpdateDto] } };
    }
}
exports.UpdateDietDto = UpdateDietDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDietDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDietDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateDietDto.prototype, "isGlobal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => DietMealItemUpdateDto),
    __metadata("design:type", Array)
], UpdateDietDto.prototype, "items", void 0);
//# sourceMappingURL=update-diet.dto.js.map