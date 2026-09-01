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
exports.Invitation = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let Invitation = class Invitation extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { token: { required: true, type: () => String }, email: { required: true, type: () => String }, isAccepted: { required: true, type: () => Boolean }, expiresAt: { required: true, type: () => Date }, coach: { required: true, type: () => require("./user.entity").User }, user: { required: false, type: () => require("./user.entity").User } };
    }
};
exports.Invitation = Invitation;
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], Invitation.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Invitation.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], Invitation.prototype, "isAccepted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Invitation.prototype, "expiresAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.sentInvitations, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Invitation.prototype, "coach", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.receivedInvitations, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", user_entity_1.User)
], Invitation.prototype, "user", void 0);
exports.Invitation = Invitation = __decorate([
    (0, typeorm_1.Entity)('invitations')
], Invitation);
//# sourceMappingURL=invitation.entity.js.map