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
exports.BodyMeasurementsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_enum_1 = require("../../common/enums/user.enum");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_body_measurement_dto_1 = require("./dto/create-body-measurement.dto");
const update_body_measurement_dto_1 = require("./dto/update-body-measurement.dto");
const body_measurements_service_1 = require("./body-measurements.service");
let BodyMeasurementsController = class BodyMeasurementsController {
    constructor(bodyMeasurementsService) {
        this.bodyMeasurementsService = bodyMeasurementsService;
    }
    getMyMeasurements(user) {
        return this.bodyMeasurementsService.findByUser(user.id);
    }
    getMeasurementById(user, id) {
        return this.bodyMeasurementsService.findOneByUser(user.id, id);
    }
    createMeasurement(user, dto) {
        return this.bodyMeasurementsService.createForUser(user.id, dto);
    }
    updateMeasurement(user, id, dto) {
        return this.bodyMeasurementsService.updateForUser(user.id, id, dto);
    }
    removeMeasurement(user, id) {
        return this.bodyMeasurementsService.removeForUser(user.id, id);
    }
    getClientMeasurements(user, clientId) {
        return this.bodyMeasurementsService.findByClient(user.id, clientId);
    }
};
exports.BodyMeasurementsController = BodyMeasurementsController;
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/body-measurement.entity").BodyMeasurement] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "getMyMeasurements", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/body-measurement.entity").BodyMeasurement }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "getMeasurementById", null);
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/body-measurement.entity").BodyMeasurement }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_body_measurement_dto_1.CreateBodyMeasurementDto]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "createMeasurement", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/body-measurement.entity").BodyMeasurement }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_body_measurement_dto_1.UpdateBodyMeasurementDto]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "updateMeasurement", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "removeMeasurement", null);
__decorate([
    (0, common_1.Get)('coach/:clientId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/body-measurement.entity").BodyMeasurement] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BodyMeasurementsController.prototype, "getClientMeasurements", null);
exports.BodyMeasurementsController = BodyMeasurementsController = __decorate([
    (0, common_1.Controller)('body-measurements'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [body_measurements_service_1.BodyMeasurementsService])
], BodyMeasurementsController);
//# sourceMappingURL=body-measurements.controller.js.map