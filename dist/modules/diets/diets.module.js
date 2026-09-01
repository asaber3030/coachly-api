"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DietsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const diet_entity_1 = require("../../common/entities/diet.entity");
const diet_item_entity_1 = require("../../common/entities/diet-item.entity");
const meal_entity_1 = require("../../common/entities/meal.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const roles_guard_1 = require("../../common/guards/roles.guard");
const diets_controller_1 = require("./diets.controller");
const diets_service_1 = require("./diets.service");
let DietsModule = class DietsModule {
};
exports.DietsModule = DietsModule;
exports.DietsModule = DietsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([diet_entity_1.Diet, diet_item_entity_1.DietItem, meal_entity_1.Meal, user_entity_1.User])],
        controllers: [diets_controller_1.DietsController],
        providers: [diets_service_1.DietsService, roles_guard_1.RolesGuard],
        exports: [diets_service_1.DietsService],
    })
], DietsModule);
//# sourceMappingURL=diets.module.js.map