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
exports.User = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_enum_1 = require("../enums/user.enum");
const invitation_entity_1 = require("./invitation.entity");
const user_profile_entity_1 = require("./user-profile.entity");
let User = class User extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { firstName: { required: true, type: () => String }, lastName: { required: true, type: () => String }, email: { required: true, type: () => String }, password: { required: true, type: () => String }, role: { required: true, enum: require("../enums/user.enum").UserRoleEnum }, isActive: { required: true, type: () => Boolean }, profile: { required: true, type: () => require("./user-profile.entity").UserProfile }, sentInvitations: { required: true, type: () => [require("./invitation.entity").Invitation] }, receivedInvitations: { required: true, type: () => [require("./invitation.entity").Invitation] } };
    }
};
exports.User = User;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: user_enum_1.UserRoleEnum,
        default: user_enum_1.UserRoleEnum.USER,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: true,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_profile_entity_1.UserProfile, (profile) => profile.user, {
        cascade: true,
    }),
    __metadata("design:type", user_profile_entity_1.UserProfile)
], User.prototype, "profile", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invitation_entity_1.Invitation, (invitation) => invitation.coach),
    __metadata("design:type", Array)
], User.prototype, "sentInvitations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => invitation_entity_1.Invitation, (invitation) => invitation.user),
    __metadata("design:type", Array)
], User.prototype, "receivedInvitations", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)('users')
], User);
//# sourceMappingURL=user.entity.js.map