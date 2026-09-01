import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Meal } from '@app/common/entities/meal.entity';
import { Recipe } from '@app/common/entities/recipe.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private readonly mealsRepository: Repository<Meal>,
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllForCoach(userId: string, limit: number, offset: number): Promise<Meal[]> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    return this.mealsRepository.find({
      where: [{ createdBy: { id: userId } }, { isGlobal: true }],
      relations: ['createdBy', 'recipes'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findOneForCoach(userId: string, mealId: string): Promise<Meal> {
    const meal = await this.mealsRepository.findOne({
      where: [
        { id: mealId, createdBy: { id: userId } },
        { id: mealId, isGlobal: true },
      ],
      relations: ['createdBy', 'recipes'],
    });

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return meal;
  }

  async createForCoach(userId: string, dto: CreateMealDto): Promise<Meal> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    const meal = this.mealsRepository.create({
      name: dto.name,
      isGlobal: dto.isGlobal,
      createdBy: coach,
    });

    if (dto.recipes && dto.recipes.length > 0) {
      const recipeIds = dto.recipes.map((item) => item.recipeId);
      const recipes = await this.recipesRepository.find({ where: { id: In(recipeIds) } });

      if (recipes.length !== recipeIds.length) {
        throw new NotFoundException('One or more recipes were not found');
      }

      meal.recipes = recipes;
    }

    return this.mealsRepository.save(meal);
  }

  async updateForCoach(userId: string, mealId: string, dto: UpdateMealDto): Promise<Meal> {
    const meal = await this.findOneForCoach(userId, mealId);

    Object.assign(meal, {
      name: dto.name ?? meal.name,
      isGlobal: dto.isGlobal === undefined,
    });

    if (dto.recipes) {
      const recipeIds = dto.recipes.map((item) => item.recipeId);
      const recipes = await this.recipesRepository.find({ where: { id: In(recipeIds) } });

      if (recipes.length !== recipeIds.length) {
        throw new NotFoundException('One or more recipes were not found');
      }

      meal.recipes = recipes;
    }

    return this.mealsRepository.save(meal);
  }

  async removeForCoach(userId: string, mealId: string): Promise<{ deleted: boolean }> {
    const meal = await this.findOneForCoach(userId, mealId);
    await this.mealsRepository.remove(meal);

    return { deleted: true };
  }
}
