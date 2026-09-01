import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { CoachService } from './coach.service';
export declare class CoachController {
    private readonly coachService;
    constructor(coachService: CoachService);
    inviteClient(user: AuthenticatedUser, dto: CreateInvitationDto): Promise<import("../../common/entities/invitation.entity").Invitation>;
    findClients(user: AuthenticatedUser, limit?: string, offset?: string): Promise<import("../../common/entities/coach-client.entity").CoachClient[]>;
    findInvitations(user: AuthenticatedUser): Promise<import("../../common/entities/invitation.entity").Invitation[]>;
    assignWorkout(user: AuthenticatedUser, clientId: string, workoutId: string, notes?: string): Promise<import("../../common/entities/client-workout-assignment.entity").ClientWorkoutAssignment>;
    removeWorkoutAssignment(user: AuthenticatedUser, clientId: string, workoutId: string): Promise<{
        deleted: boolean;
    }>;
    listWorkoutAssignments(user: AuthenticatedUser, clientId: string): Promise<import("../../common/entities/client-workout-assignment.entity").ClientWorkoutAssignment[]>;
    assignExercise(user: AuthenticatedUser, clientId: string, exerciseId: string, notes?: string): Promise<import("../../common/entities/client-exercise-assignment.entity").ClientExerciseAssignment>;
    removeExerciseAssignment(user: AuthenticatedUser, clientId: string, exerciseId: string): Promise<{
        deleted: boolean;
    }>;
    listExerciseAssignments(user: AuthenticatedUser, clientId: string): Promise<import("../../common/entities/client-exercise-assignment.entity").ClientExerciseAssignment[]>;
    assignMeal(user: AuthenticatedUser, clientId: string, mealId: string, notes?: string): Promise<import("../../common/entities/client-meal-assignment.entity").ClientMealAssignment>;
    removeMealAssignment(user: AuthenticatedUser, clientId: string, mealId: string): Promise<{
        deleted: boolean;
    }>;
    listMealAssignments(user: AuthenticatedUser, clientId: string): Promise<import("../../common/entities/client-meal-assignment.entity").ClientMealAssignment[]>;
    assignDiet(user: AuthenticatedUser, clientId: string, dietId: string, notes?: string): Promise<import("../../common/entities/client-diet-assignment.entity").ClientDietAssignment>;
    removeDietAssignment(user: AuthenticatedUser, clientId: string, dietId: string): Promise<{
        deleted: boolean;
    }>;
    listDietAssignments(user: AuthenticatedUser, clientId: string): Promise<import("../../common/entities/client-diet-assignment.entity").ClientDietAssignment[]>;
    acceptInvite(user: AuthenticatedUser, token: string): Promise<{
        accepted: boolean;
        coachId?: string;
    }>;
}
