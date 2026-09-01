import { Repository } from 'typeorm';
import { ClientDietAssignment } from '@app/common/entities/client-diet-assignment.entity';
import { ClientExerciseAssignment } from '@app/common/entities/client-exercise-assignment.entity';
import { ClientMealAssignment } from '@app/common/entities/client-meal-assignment.entity';
import { ClientWorkoutAssignment } from '@app/common/entities/client-workout-assignment.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { Diet } from '@app/common/entities/diet.entity';
import { Exercise } from '@app/common/entities/excersie.entity';
import { Invitation } from '@app/common/entities/invitation.entity';
import { Meal } from '@app/common/entities/meal.entity';
import { User } from '@app/common/entities/user.entity';
import { Workout } from '@app/common/entities/workout.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';
export declare class CoachService {
    private readonly usersRepository;
    private readonly invitationsRepository;
    private readonly coachClientsRepository;
    private readonly workoutsRepository;
    private readonly exercisesRepository;
    private readonly mealsRepository;
    private readonly dietsRepository;
    private readonly clientWorkoutAssignmentsRepository;
    private readonly clientExerciseAssignmentsRepository;
    private readonly clientMealAssignmentsRepository;
    private readonly clientDietAssignmentsRepository;
    constructor(usersRepository: Repository<User>, invitationsRepository: Repository<Invitation>, coachClientsRepository: Repository<CoachClient>, workoutsRepository: Repository<Workout>, exercisesRepository: Repository<Exercise>, mealsRepository: Repository<Meal>, dietsRepository: Repository<Diet>, clientWorkoutAssignmentsRepository: Repository<ClientWorkoutAssignment>, clientExerciseAssignmentsRepository: Repository<ClientExerciseAssignment>, clientMealAssignmentsRepository: Repository<ClientMealAssignment>, clientDietAssignmentsRepository: Repository<ClientDietAssignment>);
    inviteClient(userId: string, dto: CreateInvitationDto): Promise<Invitation>;
    findClients(userId: string, limit: number, offset: number): Promise<CoachClient[]>;
    findInvitations(userId: string): Promise<Invitation[]>;
    assignWorkoutToClient(userId: string, clientId: string, workoutId: string, notes?: string): Promise<ClientWorkoutAssignment>;
    removeWorkoutAssignment(userId: string, clientId: string, workoutId: string): Promise<{
        deleted: boolean;
    }>;
    listWorkoutAssignments(userId: string, clientId: string): Promise<ClientWorkoutAssignment[]>;
    assignExerciseToClient(userId: string, clientId: string, exerciseId: string, notes?: string): Promise<ClientExerciseAssignment>;
    removeExerciseAssignment(userId: string, clientId: string, exerciseId: string): Promise<{
        deleted: boolean;
    }>;
    listExerciseAssignments(userId: string, clientId: string): Promise<ClientExerciseAssignment[]>;
    assignMealToClient(userId: string, clientId: string, mealId: string, notes?: string): Promise<ClientMealAssignment>;
    removeMealAssignment(userId: string, clientId: string, mealId: string): Promise<{
        deleted: boolean;
    }>;
    listMealAssignments(userId: string, clientId: string): Promise<ClientMealAssignment[]>;
    assignDietToClient(userId: string, clientId: string, dietId: string, notes?: string): Promise<ClientDietAssignment>;
    removeDietAssignment(userId: string, clientId: string, dietId: string): Promise<{
        deleted: boolean;
    }>;
    listDietAssignments(userId: string, clientId: string): Promise<ClientDietAssignment[]>;
    acceptInvite(userId: string, token: string): Promise<{
        accepted: boolean;
        coachId?: string;
    }>;
    private getCoachClient;
}
