import { Recipe } from './recipe.entity';
import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class Meal extends BaseEntity {
    name: string;
    isGlobal: boolean;
    recipes: Recipe[];
    createdBy?: User;
}
