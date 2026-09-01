import { User } from './user.entity';
import { BaseEntity } from './base.entity';
export declare class Recipe extends BaseEntity {
    name: string;
    description?: string;
    instructions?: string;
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
    isGlobal: boolean;
    createdBy?: User;
}
