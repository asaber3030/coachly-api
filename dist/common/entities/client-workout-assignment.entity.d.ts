import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Workout } from './workout.entity';
export declare class ClientWorkoutAssignment extends BaseEntity {
    coachClient: CoachClient;
    workout: Workout;
    isActive: boolean;
    notes?: string;
}
