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
exports.ExercisesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_enum_1 = require("../../common/enums/user.enum");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_exercise_dto_1 = require("./dto/create-exercise.dto");
const update_exercise_dto_1 = require("./dto/update-exercise.dto");
const exercises_service_1 = require("./exercises.service");
let ExercisesController = class ExercisesController {
    constructor(exercisesService) {
        this.exercisesService = exercisesService;
    }
    findAll(user, limit, offset) {
        return this.exercisesService.findAllForCoach(user.id, Number(limit ?? 20), Number(offset ?? 0));
    }
    findOne(user, id) {
        return this.exercisesService.findOneForCoach(user.id, id);
    }
    create(user, dto) {
        return this.exercisesService.createForCoach(user.id, dto);
    }
    update(user, id, dto) {
        return this.exercisesService.updateForCoach(user.id, id, dto);
    }
    remove(user, id) {
        return this.exercisesService.removeForCoach(user.id, id);
    }
};
exports.ExercisesController = ExercisesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/excersie.entity").Exercise] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/excersie.entity").Exercise }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/excersie.entity").Exercise }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_exercise_dto_1.CreateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: require("../../common/entities/excersie.entity").Exercise }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_exercise_dto_1.UpdateExerciseDto]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], ExercisesController.prototype, "remove", null);
exports.ExercisesController = ExercisesController = __decorate([
    (0, common_1.Controller)('exercises'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService])
], ExercisesController);
//# sourceMappingURL=exercises.controller.js.map