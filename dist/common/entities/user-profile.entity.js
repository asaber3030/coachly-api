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
exports.UserProfile = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let UserProfile = class UserProfile extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { phone: { required: false, type: () => String }, height: { required: false, type: () => Number }, birthDate: { required: false, type: () => Date }, gender: { required: false, type: () => String }, avatar: { required: false, type: () => String }, goal: { required: false, type: () => String }, user: { required: true, type: () => require("./user.entity").User } };
    }
};
exports.UserProfile = UserProfile;
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProfile.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 5,
        scale: 2,
        nullable: true,
    }),
    __metadata("design:type", Number)
], UserProfile.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], UserProfile.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], UserProfile.prototype, "goal", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.profile, {
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], UserProfile.prototype, "user", void 0);
exports.UserProfile = UserProfile = __decorate([
    (0, typeorm_1.Entity)('user_profiles')
], UserProfile);
//# sourceMappingURL=user-profile.entity.js.map