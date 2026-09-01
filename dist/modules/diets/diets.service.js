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
exports.DietsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const diet_entity_1 = require("../../common/entities/diet.entity");
const diet_item_entity_1 = require("../../common/entities/diet-item.entity");
const meal_entity_1 = require("../../common/entities/meal.entity");
const user_entity_1 = require("../../common/entities/user.entity");
let DietsService = class DietsService {
    constructor(dietsRepository, dietItemsRepository, mealsRepository, usersRepository) {
        this.dietsRepository = dietsRepository;
        this.dietItemsRepository = dietItemsRepository;
        this.mealsRepository = mealsRepository;
        this.usersRepository = usersRepository;
    }
    async findAllForCoach(userId, limit, offset) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        return this.dietsRepository.find({
            where: [{ createdBy: { id: userId } }, { isGlobal: true }],
            relations: ['createdBy', 'items', 'items.meal'],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async findOneForCoach(userId, dietId) {
        const diet = await this.dietsRepository.findOne({
            where: [
                { id: dietId, createdBy: { id: userId } },
                { id: dietId, isGlobal: true },
            ],
            relations: ['createdBy', 'items', 'items.meal'],
        });
        if (!diet) {
            throw new common_1.NotFoundException('Diet not found');
        }
        return diet;
    }
    async createForCoach(userId, dto) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        const diet = this.dietsRepository.create({
            name: dto.name,
            description: dto.description,
            isGlobal: dto.isGlobal,
            createdBy: coach,
        });
        const savedDiet = await this.dietsRepository.save(diet);
        if (dto.items && dto.items.length > 0) {
            const mealIds = dto.items.map((item) => item.mealId);
            const meals = await this.mealsRepository.find({ where: { id: (0, typeorm_2.In)(mealIds) } });
            if (meals.length !== mealIds.length) {
                throw new common_1.NotFoundException('One or more meals were not found');
            }
            const items = dto.items.map((item) => {
                const meal = meals.find((entry) => entry.id === item.mealId);
                return this.dietItemsRepository.create({
                    diet: savedDiet,
                    meal: meal,
                    dayOfWeek: item.dayOfWeek,
                    mealTime: item.mealTime,
                });
            });
            await this.dietItemsRepository.save(items);
            savedDiet.items = items;
        }
        return savedDiet;
    }
    async updateForCoach(userId, dietId, dto) {
        const diet = await this.findOneForCoach(userId, dietId);
        Object.assign(diet, {
            name: dto.name ?? diet.name,
            description: dto.description ?? diet.description,
            isGlobal: dto.isGlobal,
        });
        const savedDiet = await this.dietsRepository.save(diet);
        if (dto.items) {
            await this.dietItemsRepository.delete({ diet: { id: diet.id } });
            if (dto.items.length > 0) {
                const mealIds = dto.items.map((item) => item.mealId);
                const meals = await this.mealsRepository.find({ where: { id: (0, typeorm_2.In)(mealIds) } });
                if (meals.length !== mealIds.length) {
                    throw new common_1.NotFoundException('One or more meals were not found');
                }
                const nextItems = dto.items.map((item) => {
                    const meal = meals.find((entry) => entry.id === item.mealId);
                    return this.dietItemsRepository.create({
                        diet: savedDiet,
                        meal: meal,
                        dayOfWeek: item.dayOfWeek,
                        mealTime: item.mealTime,
                    });
                });
                await this.dietItemsRepository.save(nextItems);
            }
        }
        return this.findOneForCoach(userId, dietId);
    }
    async removeForCoach(userId, dietId) {
        const diet = await this.findOneForCoach(userId, dietId);
        await this.dietsRepository.remove(diet);
        return { deleted: true };
    }
};
exports.DietsService = DietsService;
exports.DietsService = DietsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(diet_entity_1.Diet)),
    __param(1, (0, typeorm_1.InjectRepository)(diet_item_entity_1.DietItem)),
    __param(2, (0, typeorm_1.InjectRepository)(meal_entity_1.Meal)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], DietsService);
//# sourceMappingURL=diets.service.js.map