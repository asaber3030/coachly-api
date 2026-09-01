import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Recipe } from '@app/common/entities/recipe.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipesRepository: Repository<Recipe>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllForCoach(userId: string, limit: number, offset: number): Promise<Recipe[]> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    return this.recipesRepository.find({
      where: [{ createdBy: { id: userId } }, { isGlobal: true }],
      relations: ['createdBy'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findOneForCoach(userId: string, recipeId: string): Promise<Recipe> {
    const recipe = await this.recipesRepository.findOne({
      where: [
        { id: recipeId, createdBy: { id: userId } },
        { id: recipeId, isGlobal: true },
      ],
      relations: ['createdBy'],
    });

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }

  async createForCoach(userId: string, dto: CreateRecipeDto): Promise<Recipe> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
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

  async updateForCoach(userId: string, recipeId: string, dto: UpdateRecipeDto): Promise<Recipe> {
    const recipe = await this.findOneForCoach(userId, recipeId);

    Object.assign(recipe, {
      name: dto.name ?? recipe.name,
      description: dto.description ?? recipe.description,
      instructions: dto.instructions ?? recipe.instructions,
      calories: dto.calories ?? recipe.calories,
      protein: dto.protein ?? recipe.protein,
      carbs: dto.carbs ?? recipe.carbs,
      fats: dto.fats ?? recipe.fats,
      isGlobal:
        dto.isGlobal === undefined
         
    });

    return this.recipesRepository.save(recipe);
  }

  async removeForCoach(userId: string, recipeId: string): Promise<{ deleted: boolean }> {
    const recipe = await this.findOneForCoach(userId, recipeId);
    await this.recipesRepository.remove(recipe);

    return { deleted: true };
  }
}
