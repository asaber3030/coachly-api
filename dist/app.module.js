"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const configuration_1 = require("./config/configuration");
const database_module_1 = require("./database/database.module");
const jwt_auth_guard_1 = require("./common/guards/jwt-auth.guard");
const env_schema_1 = require("./common/schemas/env.schema");
const auth_module_1 = require("./modules/auth/auth.module");
const body_measurements_module_1 = require("./modules/measurements/body-measurements.module");
const coach_module_1 = require("./modules/coach/coach.module");
const diets_module_1 = require("./modules/diets/diets.module");
const exercises_module_1 = require("./modules/exercises/exercises.module");
const meals_module_1 = require("./modules/meals/meals.module");
const progress_module_1 = require("./modules/progress/progress.module");
const progress_photos_module_1 = require("./modules/progress-photos/progress-photos.module");
const recipes_module_1 = require("./modules/recipes/recipes.module");
const users_module_1 = require("./modules/users/users.module");
const workouts_module_1 = require("./modules/workouts/workouts.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validationSchema: env_schema_1.validationSchema,
                validationOptions: { abortEarly: false },
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                useFactory: () => ({
                    throttlers: [
                        {
                            ttl: parseInt(process.env.THROTTLE_TTL ?? '60', 10) * 1000,
                            limit: parseInt(process.env.THROTTLE_LIMIT ?? '20', 10),
                        },
                    ],
                }),
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            coach_module_1.CoachModule,
            exercises_module_1.ExercisesModule,
            workouts_module_1.WorkoutsModule,
            recipes_module_1.RecipesModule,
            meals_module_1.MealsModule,
            diets_module_1.DietsModule,
            progress_module_1.ProgressModule,
            body_measurements_module_1.BodyMeasurementsModule,
            progress_photos_module_1.ProgressPhotosModule,
        ],
        providers: [
            { provide: core_1.APP_GUARD, useClass: throttler_1.ThrottlerGuard },
            { provide: core_1.APP_GUARD, useClass: jwt_auth_guard_1.JwtAuthGuard },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map