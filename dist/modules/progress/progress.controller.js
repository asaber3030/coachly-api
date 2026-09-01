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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_enum_1 = require("../../common/enums/user.enum");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_progress_dto_1 = require("./dto/create-progress.dto");
const update_progress_dto_1 = require("./dto/update-progress.dto");
const progress_service_1 = require("./progress.service");
let ProgressController = class ProgressController {
    constructor(progressService) {
        this.progressService = progressService;
    }
    getMyProgress(user, limit, offset) {
        return this.progressService.findByUser(user.id, Number(limit ?? 20), Number(offset ?? 0));
    }
    getProgressById(user, id) {
        return this.progressService.findOneByUser(user.id, id);
    }
    createProgress(user, dto) {
        return this.progressService.createForUser(user.id, dto);
    }
    updateProgress(user, id, dto) {
        return this.progressService.updateForUser(user.id, id, dto);
    }
    removeProgress(user, id) {
        return this.progressService.removeForUser(user.id, id);
    }
    getClientProgress(user, clientId) {
        return this.progressService.findByClient(user.id, clientId);
    }
};
exports.ProgressController = ProgressController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/progress.entity").Progress] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "getMyProgress", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/progress.entity").Progress }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "getProgressById", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/progress.entity").Progress }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_progress_dto_1.CreateProgressDto]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "createProgress", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/progress.entity").Progress }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_progress_dto_1.UpdateProgressDto]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "removeProgress", null);
__decorate([
    (0, common_1.Get)('coach/:clientId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/progress.entity").Progress] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ProgressController.prototype, "getClientProgress", null);
exports.ProgressController = ProgressController = __decorate([
    (0, common_1.Controller)('progress'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [progress_service_1.ProgressService])
], ProgressController);
//# sourceMappingURL=progress.controller.js.map