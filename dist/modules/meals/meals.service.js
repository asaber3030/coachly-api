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
exports.MealsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const meal_entity_1 = require("../../common/entities/meal.entity");
const recipe_entity_1 = require("../../common/entities/recipe.entity");
const user_entity_1 = require("../../common/entities/user.entity");
let MealsService = class MealsService {
    constructor(mealsRepository, recipesRepository, usersRepository) {
        this.mealsRepository = mealsRepository;
        this.recipesRepository = recipesRepository;
        this.usersRepository = usersRepository;
    }
    async findAllForCoach(userId, limit, offset) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        return this.mealsRepository.find({
            where: [{ createdBy: { id: userId } }, { isGlobal: true }],
            relations: ['createdBy', 'recipes'],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async findOneForCoach(userId, mealId) {
        const meal = await this.mealsRepository.findOne({
            where: [
                { id: mealId, createdBy: { id: userId } },
                { id: mealId, isGlobal: true },
            ],
            relations: ['createdBy', 'recipes'],
        });
        if (!meal) {
            throw new common_1.NotFoundException('Meal not found');
        }
        return meal;
    }
    async createForCoach(userId, dto) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        const meal = this.mealsRepository.create({
            name: dto.name,
            isGlobal: dto.isGlobal,
            createdBy: coach,
        });
        if (dto.recipes && dto.recipes.length > 0) {
            const recipeIds = dto.recipes.map((item) => item.recipeId);
            const recipes = await this.recipesRepository.find({ where: { id: (0, typeorm_2.In)(recipeIds) } });
            if (recipes.length !== recipeIds.length) {
                throw new common_1.NotFoundException('One or more recipes were not found');
            }
            meal.recipes = recipes;
        }
        return this.mealsRepository.save(meal);
    }
    async updateForCoach(userId, mealId, dto) {
        const meal = await this.findOneForCoach(userId, mealId);
        Object.assign(meal, {
            name: dto.name ?? meal.name,
            isGlobal: dto.isGlobal === undefined,
        });
        if (dto.recipes) {
            const recipeIds = dto.recipes.map((item) => item.recipeId);
            const recipes = await this.recipesRepository.find({ where: { id: (0, typeorm_2.In)(recipeIds) } });
            if (recipes.length !== recipeIds.length) {
                throw new common_1.NotFoundException('One or more recipes were not found');
            }
            meal.recipes = recipes;
        }
        return this.mealsRepository.save(meal);
    }
    async removeForCoach(userId, mealId) {
        const meal = await this.findOneForCoach(userId, mealId);
        await this.mealsRepository.remove(meal);
        return { deleted: true };
    }
};
exports.MealsService = MealsService;
exports.MealsService = MealsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(meal_entity_1.Meal)),
    __param(1, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], MealsService);
//# sourceMappingURL=meals.service.js.map