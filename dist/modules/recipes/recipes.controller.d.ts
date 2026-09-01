import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';
export declare class RecipesController {
    private readonly recipesService;
    constructor(recipesService: RecipesService);
    findAll(user: AuthenticatedUser, limit?: string, offset?: string): Promise<import("../../common/entities/recipe.entity").Recipe[]>;
    findOne(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/recipe.entity").Recipe>;
    create(user: AuthenticatedUser, dto: CreateRecipeDto): Promise<import("../../common/entities/recipe.entity").Recipe>;
    update(user: AuthenticatedUser, id: string, dto: UpdateRecipeDto): Promise<import("../../common/entities/recipe.entity").Recipe>;
    remove(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
}
