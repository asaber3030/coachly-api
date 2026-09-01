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
exports.DietItem = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const diet_entity_1 = require("./diet.entity");
const meal_entity_1 = require("./meal.entity");
const base_entity_1 = require("./base.entity");
let DietItem = class DietItem extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { dayOfWeek: { required: true, type: () => Number }, mealTime: { required: true, type: () => String }, diet: { required: true, type: () => require("./diet.entity").Diet }, meal: { required: true, type: () => require("./meal.entity").Meal } };
    }
};
exports.DietItem = DietItem;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], DietItem.prototype, "dayOfWeek", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DietItem.prototype, "mealTime", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => diet_entity_1.Diet, (diet) => diet.items, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", diet_entity_1.Diet)
], DietItem.prototype, "diet", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => meal_entity_1.Meal),
    __metadata("design:type", meal_entity_1.Meal)
], DietItem.prototype, "meal", void 0);
exports.DietItem = DietItem = __decorate([
    (0, typeorm_1.Entity)('diet_items')
], DietItem);
//# sourceMappingURL=diet-item.entity.js.map