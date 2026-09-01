import { Repository } from 'typeorm';
import { Meal } from '@app/common/entities/meal.entity';
import { Recipe } from '@app/common/entities/recipe.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
export declare class MealsService {
    private readonly mealsRepository;
    private readonly recipesRepository;
    private readonly usersRepository;
    constructor(mealsRepository: Repository<Meal>, recipesRepository: Repository<Recipe>, usersRepository: Repository<User>);
    findAllForCoach(userId: string, limit: number, offset: number): Promise<Meal[]>;
    findOneForCoach(userId: string, mealId: string): Promise<Meal>;
    createForCoach(userId: string, dto: CreateMealDto): Promise<Meal>;
    updateForCoach(userId: string, mealId: string, dto: UpdateMealDto): Promise<Meal>;
    removeForCoach(userId: string, mealId: string): Promise<{
        deleted: boolean;
    }>;
}
