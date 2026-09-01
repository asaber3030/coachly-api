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
exports.ExerciseGroup = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const base_entity_1 = require("./base.entity");
let ExerciseGroup = class ExerciseGroup extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, createdBy: { required: false, type: () => require("./user.entity").User } };
    }
};
exports.ExerciseGroup = ExerciseGroup;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExerciseGroup.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], ExerciseGroup.prototype, "createdBy", void 0);
exports.ExerciseGroup = ExerciseGroup = __decorate([
    (0, typeorm_1.Entity)('exercise_groups')
], ExerciseGroup);
//# sourceMappingURL=execrsie-group.entity.js.map