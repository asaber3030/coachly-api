import { Diet } from './diet.entity';
import { Meal } from './meal.entity';
import { BaseEntity } from './base.entity';
export declare class DietItem extends BaseEntity {
    dayOfWeek: number;
    mealTime: string;
    diet: Diet;
    meal: Meal;
}
