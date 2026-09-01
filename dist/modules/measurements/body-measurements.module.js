"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyMeasurementsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const body_measurement_entity_1 = require("../../common/entities/body-measurement.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const body_measurements_controller_1 = require("./body-measurements.controller");
const body_measurements_service_1 = require("./body-measurements.service");
const roles_guard_1 = require("../../common/guards/roles.guard");
let BodyMeasurementsModule = class BodyMeasurementsModule {
};
exports.BodyMeasurementsModule = BodyMeasurementsModule;
exports.BodyMeasurementsModule = BodyMeasurementsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([body_measurement_entity_1.BodyMeasurement, user_entity_1.User, coach_client_entity_1.CoachClient])],
        controllers: [body_measurements_controller_1.BodyMeasurementsController],
        providers: [body_measurements_service_1.BodyMeasurementsService, roles_guard_1.RolesGuard],
        exports: [body_measurements_service_1.BodyMeasurementsService],
    })
], BodyMeasurementsModule);
//# sourceMappingURL=body-measurements.module.js.map