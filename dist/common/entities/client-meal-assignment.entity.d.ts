import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Meal } from './meal.entity';
export declare class ClientMealAssignment extends BaseEntity {
    coachClient: CoachClient;
    meal: Meal;
    isActive: boolean;
    notes?: string;
}
