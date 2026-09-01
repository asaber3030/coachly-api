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
exports.RecipesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("../../common/entities/recipe.entity");
const user_entity_1 = require("../../common/entities/user.entity");
let RecipesService = class RecipesService {
    constructor(recipesRepository, usersRepository) {
        this.recipesRepository = recipesRepository;
        this.usersRepository = usersRepository;
    }
    async findAllForCoach(userId, limit, offset) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        return this.recipesRepository.find({
            where: [{ createdBy: { id: userId } }, { isGlobal: true }],
            relations: ['createdBy'],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async findOneForCoach(userId, recipeId) {
        const recipe = await this.recipesRepository.findOne({
            where: [
                { id: recipeId, createdBy: { id: userId } },
                { id: recipeId, isGlobal: true },
            ],
            relations: ['createdBy'],
        });
        if (!recipe) {
            throw new common_1.NotFoundException('Recipe not found');
        }
        return recipe;
    }
    async createForCoach(userId, dto) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        const recipe = this.recipesRepository.create({
            name: dto.name,
            description: dto.description,
            instructions: dto.instructions,
            calories: dto.calories,
            protein: dto.protein,
            carbs: dto.carbs,
            fats: dto.fats,
            isGlobal: dto.isGlobal,
            createdBy: coach,
        });
        return this.recipesRepository.save(recipe);
    }
    async updateForCoach(userId, recipeId, dto) {
        const recipe = await this.findOneForCoach(userId, recipeId);
        Object.assign(recipe, {
            name: dto.name ?? recipe.name,
            description: dto.description ?? recipe.description,
            instructions: dto.instructions ?? recipe.instructions,
            calories: dto.calories ?? recipe.calories,
            protein: dto.protein ?? recipe.protein,
            carbs: dto.carbs ?? recipe.carbs,
            fats: dto.fats ?? recipe.fats,
            isGlobal: dto.isGlobal === undefined
        });
        return this.recipesRepository.save(recipe);
    }
    async removeForCoach(userId, recipeId) {
        const recipe = await this.findOneForCoach(userId, recipeId);
        await this.recipesRepository.remove(recipe);
        return { deleted: true };
    }
};
exports.RecipesService = RecipesService;
exports.RecipesService = RecipesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RecipesService);
//# sourceMappingURL=recipes.service.js.map