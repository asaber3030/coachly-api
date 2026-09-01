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
exports.ClientDietAssignment = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const coach_client_entity_1 = require("./coach-client.entity");
const diet_entity_1 = require("./diet.entity");
let ClientDietAssignment = class ClientDietAssignment extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { coachClient: { required: true, type: () => require("./coach-client.entity").CoachClient }, diet: { required: true, type: () => require("./diet.entity").Diet }, isActive: { required: true, type: () => Boolean }, notes: { required: false, type: () => String } };
    }
};
exports.ClientDietAssignment = ClientDietAssignment;
__decorate([
    (0, typeorm_1.ManyToOne)(() => coach_client_entity_1.CoachClient, { onDelete: 'CASCADE' }),
    __metadata("design:type", coach_client_entity_1.CoachClient)
], ClientDietAssignment.prototype, "coachClient", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => diet_entity_1.Diet, { onDelete: 'CASCADE' }),
    __metadata("design:type", diet_entity_1.Diet)
], ClientDietAssignment.prototype, "diet", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], ClientDietAssignment.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ClientDietAssignment.prototype, "notes", void 0);
exports.ClientDietAssignment = ClientDietAssignment = __decorate([
    (0, typeorm_1.Entity)('client_diet_assignments')
], ClientDietAssignment);
//# sourceMappingURL=client-diet-assignment.entity.js.map