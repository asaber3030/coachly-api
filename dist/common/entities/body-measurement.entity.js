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
exports.BodyMeasurement = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
let BodyMeasurement = class BodyMeasurement extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { chest: { required: false, type: () => Number }, waist: { required: false, type: () => Number }, hips: { required: false, type: () => Number }, arms: { required: false, type: () => Number }, thighs: { required: false, type: () => Number }, date: { required: true, type: () => Date }, user: { required: true, type: () => require("./user.entity").User } };
    }
};
exports.BodyMeasurement = BodyMeasurement;
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], BodyMeasurement.prototype, "chest", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], BodyMeasurement.prototype, "waist", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], BodyMeasurement.prototype, "hips", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], BodyMeasurement.prototype, "arms", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', nullable: true }),
    __metadata("design:type", Number)
], BodyMeasurement.prototype, "thighs", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], BodyMeasurement.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], BodyMeasurement.prototype, "user", void 0);
exports.BodyMeasurement = BodyMeasurement = __decorate([
    (0, typeorm_1.Entity)('body_measurements')
], BodyMeasurement);
//# sourceMappingURL=body-measurement.entity.js.map