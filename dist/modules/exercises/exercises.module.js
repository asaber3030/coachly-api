"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const excersie_entity_1 = require("../../common/entities/excersie.entity");
const execrsie_group_entity_1 = require("../../common/entities/execrsie-group.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const roles_guard_1 = require("../../common/guards/roles.guard");
const exercises_controller_1 = require("./exercises.controller");
const exercises_service_1 = require("./exercises.service");
let ExercisesModule = class ExercisesModule {
};
exports.ExercisesModule = ExercisesModule;
exports.ExercisesModule = ExercisesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([excersie_entity_1.Exercise, execrsie_group_entity_1.ExerciseGroup, user_entity_1.User])],
        controllers: [exercises_controller_1.ExercisesController],
        providers: [exercises_service_1.ExercisesService, roles_guard_1.RolesGuard],
        exports: [exercises_service_1.ExercisesService],
    })
], ExercisesModule);
//# sourceMappingURL=exercises.module.js.map