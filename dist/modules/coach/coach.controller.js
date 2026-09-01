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
exports.CoachController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_enum_1 = require("../../common/enums/user.enum");
const roles_guard_1 = require("../../common/guards/roles.guard");
const create_invitation_dto_1 = require("./dto/create-invitation.dto");
const coach_service_1 = require("./coach.service");
let CoachController = class CoachController {
    constructor(coachService) {
        this.coachService = coachService;
    }
    inviteClient(user, dto) {
        return this.coachService.inviteClient(user.id, dto);
    }
    findClients(user, limit, offset) {
        return this.coachService.findClients(user.id, Number(limit ?? 20), Number(offset ?? 0));
    }
    findInvitations(user) {
        return this.coachService.findInvitations(user.id);
    }
    assignWorkout(user, clientId, workoutId, notes) {
        return this.coachService.assignWorkoutToClient(user.id, clientId, workoutId, notes);
    }
    removeWorkoutAssignment(user, clientId, workoutId) {
        return this.coachService.removeWorkoutAssignment(user.id, clientId, workoutId);
    }
    listWorkoutAssignments(user, clientId) {
        return this.coachService.listWorkoutAssignments(user.id, clientId);
    }
    assignExercise(user, clientId, exerciseId, notes) {
        return this.coachService.assignExerciseToClient(user.id, clientId, exerciseId, notes);
    }
    removeExerciseAssignment(user, clientId, exerciseId) {
        return this.coachService.removeExerciseAssignment(user.id, clientId, exerciseId);
    }
    listExerciseAssignments(user, clientId) {
        return this.coachService.listExerciseAssignments(user.id, clientId);
    }
    assignMeal(user, clientId, mealId, notes) {
        return this.coachService.assignMealToClient(user.id, clientId, mealId, notes);
    }
    removeMealAssignment(user, clientId, mealId) {
        return this.coachService.removeMealAssignment(user.id, clientId, mealId);
    }
    listMealAssignments(user, clientId) {
        return this.coachService.listMealAssignments(user.id, clientId);
    }
    assignDiet(user, clientId, dietId, notes) {
        return this.coachService.assignDietToClient(user.id, clientId, dietId, notes);
    }
    removeDietAssignment(user, clientId, dietId) {
        return this.coachService.removeDietAssignment(user.id, clientId, dietId);
    }
    listDietAssignments(user, clientId) {
        return this.coachService.listDietAssignments(user.id, clientId);
    }
    acceptInvite(user, token) {
        return this.coachService.acceptInvite(user.id, token);
    }
};
exports.CoachController = CoachController;
__decorate([
    (0, common_1.Post)('invite'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/invitation.entity").Invitation }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_invitation_dto_1.CreateInvitationDto]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "inviteClient", null);
__decorate([
    (0, common_1.Get)('clients'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/coach-client.entity").CoachClient] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "findClients", null);
__decorate([
    (0, common_1.Get)('invitations'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/invitation.entity").Invitation] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "findInvitations", null);
__decorate([
    (0, common_1.Post)('clients/:clientId/workouts/:workoutId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/client-workout-assignment.entity").ClientWorkoutAssignment }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('workoutId')),
    __param(3, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "assignWorkout", null);
__decorate([
    (0, common_1.Delete)('clients/:clientId/workouts/:workoutId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('workoutId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "removeWorkoutAssignment", null);
__decorate([
    (0, common_1.Get)('clients/:clientId/workouts'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/client-workout-assignment.entity").ClientWorkoutAssignment] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "listWorkoutAssignments", null);
__decorate([
    (0, common_1.Post)('clients/:clientId/exercises/:exerciseId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/client-exercise-assignment.entity").ClientExerciseAssignment }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('exerciseId')),
    __param(3, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "assignExercise", null);
__decorate([
    (0, common_1.Delete)('clients/:clientId/exercises/:exerciseId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('exerciseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "removeExerciseAssignment", null);
__decorate([
    (0, common_1.Get)('clients/:clientId/exercises'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/client-exercise-assignment.entity").ClientExerciseAssignment] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "listExerciseAssignments", null);
__decorate([
    (0, common_1.Post)('clients/:clientId/meals/:mealId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/client-meal-assignment.entity").ClientMealAssignment }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('mealId')),
    __param(3, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "assignMeal", null);
__decorate([
    (0, common_1.Delete)('clients/:clientId/meals/:mealId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('mealId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "removeMealAssignment", null);
__decorate([
    (0, common_1.Get)('clients/:clientId/meals'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/client-meal-assignment.entity").ClientMealAssignment] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "listMealAssignments", null);
__decorate([
    (0, common_1.Post)('clients/:clientId/diets/:dietId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 201, type: require("../../common/entities/client-diet-assignment.entity").ClientDietAssignment }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('dietId')),
    __param(3, (0, common_1.Body)('notes')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "assignDiet", null);
__decorate([
    (0, common_1.Delete)('clients/:clientId/diets/:dietId'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __param(2, (0, common_1.Param)('dietId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "removeDietAssignment", null);
__decorate([
    (0, common_1.Get)('clients/:clientId/diets'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.COACH),
    openapi.ApiResponse({ status: 200, type: [require("../../common/entities/client-diet-assignment.entity").ClientDietAssignment] }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('clientId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "listDietAssignments", null);
__decorate([
    (0, common_1.Post)('accept-invite/:token'),
    (0, roles_decorator_1.Roles)(user_enum_1.UserRoleEnum.USER),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], CoachController.prototype, "acceptInvite", null);
exports.CoachController = CoachController = __decorate([
    (0, common_1.Controller)('coach'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [coach_service_1.CoachService])
], CoachController);
//# sourceMappingURL=coach.controller.js.map