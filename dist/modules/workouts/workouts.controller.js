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
exports.WorkoutsController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_guard_1 = require("../../common/guards/roles.guard");
const user_enum_1 = require("../../common/enums/user.enum");
const create_workout_dto_1 = require("./dto/create-workout.dto");
const update_workout_dto_1 = require("./dto/update-workout.dto");
const workouts_service_1 = require("./workouts.service");
let WorkoutsController = class WorkoutsController {
    constructor(workoutsService) {
        this.workoutsService = workoutsService;
    }
    findAll(user, limit, offset) {
        return this.workoutsService.findAllByCoach(user.id, Number(limit ?? 20), Number(offset ?? 0));
    }
    findOne(user, id) {
        return this.workoutsService.findOneForCoach(user.id, id);
    }
    create(user, dto) {
        return this.workoutsService.createForCoach(user.id, dto);
    }
    update(user, id, dto) {
        return this.workoutsService.updateForCoach(user.id, id, dto);
    }
    remove(user, id) {
        return this.workoutsService.removeForCoach(user.id, id);
    }
};
exports.WorkoutsController = WorkoutsController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/workout.entity").Workout] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/workout.entity").Workout }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/workout.entity").Workout }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_workout_dto_1.CreateWorkoutDto]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/workout.entity").Workout }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_workout_dto_1.UpdateWorkoutDto]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], WorkoutsController.prototype, "remove", null);
exports.WorkoutsController = WorkoutsController = __decorate([
    (0, common_1.Controller)('workouts'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [workouts_service_1.WorkoutsService])
], WorkoutsController);
//# sourceMappingURL=workouts.controller.js.map