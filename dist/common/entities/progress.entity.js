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
exports.Progress = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
let Progress = class Progress extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { weight: { required: false, type: () => Number }, bodyFat: { required: false, type: () => Number }, muscleMass: { required: false, type: () => Number }, notes: { required: false, type: () => String }, date: { required: true, type: () => Date }, user: { required: true, type: () => require("./user.entity").User } };
    }
};
exports.Progress = Progress;
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Progress.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Progress.prototype, "bodyFat", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Progress.prototype, "muscleMass", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Progress.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], Progress.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Progress.prototype, "user", void 0);
exports.Progress = Progress = __decorate([
    (0, typeorm_1.Entity)('progress')
], Progress);
//# sourceMappingURL=progress.entity.js.map