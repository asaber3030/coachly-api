"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressPhotosModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const progress_photo_entity_1 = require("../../common/entities/progress-photo.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const roles_guard_1 = require("../../common/guards/roles.guard");
const progress_photos_controller_1 = require("./progress-photos.controller");
const progress_photos_service_1 = require("./progress-photos.service");
let ProgressPhotosModule = class ProgressPhotosModule {
};
exports.ProgressPhotosModule = ProgressPhotosModule;
exports.ProgressPhotosModule = ProgressPhotosModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([progress_photo_entity_1.ProgressPhoto, user_entity_1.User, coach_client_entity_1.CoachClient])],
        controllers: [progress_photos_controller_1.ProgressPhotosController],
        providers: [progress_photos_service_1.ProgressPhotosService, roles_guard_1.RolesGuard],
        exports: [progress_photos_service_1.ProgressPhotosService],
    })
], ProgressPhotosModule);
//# sourceMappingURL=progress-photos.module.js.map