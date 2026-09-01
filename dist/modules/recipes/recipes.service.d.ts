import { Repository } from 'typeorm';
import { Recipe } from '@app/common/entities/recipe.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
export declare class RecipesService {
    private readonly recipesRepository;
    private readonly usersRepository;
    constructor(recipesRepository: Repository<Recipe>, usersRepository: Repository<User>);
    findAllForCoach(userId: string, limit: number, offset: number): Promise<Recipe[]>;
    findOneForCoach(userId: string, recipeId: string): Promise<Recipe>;
    createForCoach(userId: string, dto: CreateRecipeDto): Promise<Recipe>;
    updateForCoach(userId: string, recipeId: string, dto: UpdateRecipeDto): Promise<Recipe>;
    removeForCoach(userId: string, recipeId: string): Promise<{
        deleted: boolean;
    }>;
}
