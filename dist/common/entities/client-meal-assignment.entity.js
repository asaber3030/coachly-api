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
exports.ClientMealAssignment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const coach_client_entity_1 = require("./coach-client.entity");
const meal_entity_1 = require("./meal.entity");
let ClientMealAssignment = class ClientMealAssignment extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { coachClient: { required: true, type: () => require("./coach-client.entity").CoachClient }, meal: { required: true, type: () => require("./meal.entity").Meal }, isActive: { required: true, type: () => Boolean }, notes: { required: false, type: () => String } };
    }
};
exports.ClientMealAssignment = ClientMealAssignment;
__decorate([
    (0, typeorm_1.ManyToOne)(() => coach_client_entity_1.CoachClient, { onDelete: 'CASCADE' }),
    __metadata("design:type", coach_client_entity_1.CoachClient)
], ClientMealAssignment.prototype, "coachClient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => meal_entity_1.Meal, { onDelete: 'CASCADE' }),
    __metadata("design:type", meal_entity_1.Meal)
], ClientMealAssignment.prototype, "meal", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ClientMealAssignment.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ClientMealAssignment.prototype, "notes", void 0);
exports.ClientMealAssignment = ClientMealAssignment = __decorate([
    (0, typeorm_1.Entity)('client_meal_assignments')
], ClientMealAssignment);
//# sourceMappingURL=client-meal-assignment.entity.js.map