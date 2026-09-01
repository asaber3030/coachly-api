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
exports.CreateMealDto = exports.MealRecipeItemDto = void 0;
const openapi = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class MealRecipeItemDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { recipeId: { required: true, type: () => String } };
    }
}
exports.MealRecipeItemDto = MealRecipeItemDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], MealRecipeItemDto.prototype, "recipeId", void 0);
class CreateMealDto {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, isGlobal: { required: false, type: () => Boolean }, recipes: { required: false, type: () => [require("./create-meal.dto").MealRecipeItemDto] } };
    }
}
exports.CreateMealDto = CreateMealDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateMealDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Boolean)
], CreateMealDto.prototype, "isGlobal", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MealRecipeItemDto),
    __metadata("design:type", Array)
], CreateMealDto.prototype, "recipes", void 0);
//# sourceMappingURL=create-meal.dto.js.map