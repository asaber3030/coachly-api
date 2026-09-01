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
exports.Recipe = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
let Recipe = class Recipe extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, instructions: { required: false, type: () => String }, calories: { required: false, type: () => Number }, protein: { required: false, type: () => Number }, carbs: { required: false, type: () => Number }, fats: { required: false, type: () => Number }, isGlobal: { required: true, type: () => Boolean }, createdBy: { required: false, type: () => require("./user.entity").User } };
    }
};
exports.Recipe = Recipe;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Recipe.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Recipe.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Recipe.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Recipe.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Recipe.prototype, "protein", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Recipe.prototype, "carbs", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Recipe.prototype, "fats", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Recipe.prototype, "isGlobal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", user_entity_1.User)
], Recipe.prototype, "createdBy", void 0);
exports.Recipe = Recipe = __decorate([
    (0, typeorm_1.Entity)('recipes')
], Recipe);
//# sourceMappingURL=recipe.entity.js.map