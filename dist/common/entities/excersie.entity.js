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
exports.Exercise = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
const execrsie_group_entity_1 = require("./execrsie-group.entity");
let Exercise = class Exercise extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, muscleGroup: { required: false, type: () => String }, equipment: { required: false, type: () => String }, picture: { required: false, type: () => String }, video: { required: false, type: () => String }, instructions: { required: false, type: () => String }, isGlobal: { required: true, type: () => Boolean }, group: { required: false, type: () => require("./execrsie-group.entity").ExerciseGroup }, createdBy: { required: false, type: () => require("./user.entity").User } };
    }
};
exports.Exercise = Exercise;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Exercise.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "muscleGroup", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "video", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Exercise.prototype, "instructions", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Exercise.prototype, "isGlobal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => execrsie_group_entity_1.ExerciseGroup, {
        nullable: true,
    }),
    __metadata("design:type", execrsie_group_entity_1.ExerciseGroup)
], Exercise.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Exercise.prototype, "createdBy", void 0);
exports.Exercise = Exercise = __decorate([
    (0, typeorm_1.Entity)('exercises')
], Exercise);
//# sourceMappingURL=excersie.entity.js.map