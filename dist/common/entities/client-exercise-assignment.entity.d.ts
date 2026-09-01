import { BaseEntity } from './base.entity';
import { CoachClient } from './coach-client.entity';
import { Exercise } from './excersie.entity';
export declare class ClientExerciseAssignment extends BaseEntity {
    coachClient: CoachClient;
    exercise: Exercise;
    isActive: boolean;
    notes?: string;
}
