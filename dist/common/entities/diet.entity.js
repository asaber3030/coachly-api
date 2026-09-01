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
exports.Diet = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const diet_item_entity_1 = require("./diet-item.entity");
const base_entity_1 = require("./base.entity");
let Diet = class Diet extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, isGlobal: { required: true, type: () => Boolean }, user: { required: false, type: () => require("./user.entity").User }, createdBy: { required: false, type: () => require("./user.entity").User }, items: { required: true, type: () => [require("./diet-item.entity").DietItem] } };
    }
};
exports.Diet = Diet;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Diet.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: true,
    }),
    __metadata("design:type", String)
], Diet.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Diet.prototype, "isGlobal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Diet.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        nullable: true,
    }),
    __metadata("design:type", user_entity_1.User)
], Diet.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => diet_item_entity_1.DietItem, (item) => item.diet, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Diet.prototype, "items", void 0);
exports.Diet = Diet = __decorate([
    (0, typeorm_1.Entity)('diets')
], Diet);
//# sourceMappingURL=diet.entity.js.map