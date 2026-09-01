import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Diet } from './diet.entity';
export declare class ClientDietAssignment extends BaseEntity {
    coachClient: CoachClient;
    diet: Diet;
    isActive: boolean;
    notes?: string;
}
