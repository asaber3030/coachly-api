import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealsService } from './meals.service';
export declare class MealsController {
    private readonly mealsService;
    constructor(mealsService: MealsService);
    findAll(user: AuthenticatedUser, limit?: string, offset?: string): Promise<import("../../common/entities/meal.entity").Meal[]>;
    findOne(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/meal.entity").Meal>;
    create(user: AuthenticatedUser, dto: CreateMealDto): Promise<import("../../common/entities/meal.entity").Meal>;
    update(user: AuthenticatedUser, id: string, dto: UpdateMealDto): Promise<import("../../common/entities/meal.entity").Meal>;
    remove(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
}
