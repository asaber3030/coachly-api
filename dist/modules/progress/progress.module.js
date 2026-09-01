"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const progress_entity_1 = require("../../common/entities/progress.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const roles_guard_1 = require("../../common/guards/roles.guard");
const progress_controller_1 = require("./progress.controller");
const progress_service_1 = require("./progress.service");
let ProgressModule = class ProgressModule {
};
exports.ProgressModule = ProgressModule;
exports.ProgressModule = ProgressModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([progress_entity_1.Progress, user_entity_1.User, coach_client_entity_1.CoachClient])],
        controllers: [progress_controller_1.ProgressController],
        providers: [progress_service_1.ProgressService, roles_guard_1.RolesGuard],
        exports: [progress_service_1.ProgressService],
    })
], ProgressModule);
//# sourceMappingURL=progress.module.js.map