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
exports.ProgressPhoto = void 0;
const openapi = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
const base_entity_1 = require("./base.entity");
const user_entity_1 = require("./user.entity");
let ProgressPhoto = class ProgressPhoto extends base_entity_1.BaseEntity {
    static _OPENAPI_METADATA_FACTORY() {
        return { imageUrl: { required: true, type: () => String }, description: { required: false, type: () => String }, user: { required: true, type: () => require("./user.entity").User } };
    }
};
exports.ProgressPhoto = ProgressPhoto;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProgressPhoto.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ProgressPhoto.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ProgressPhoto.prototype, "user", void 0);
exports.ProgressPhoto = ProgressPhoto = __decorate([
    (0, typeorm_1.Entity)('progress_photos')
], ProgressPhoto);
//# sourceMappingURL=progress-photo.entity.js.map