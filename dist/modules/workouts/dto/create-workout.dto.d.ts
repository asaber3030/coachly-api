export declare class WorkoutExerciseItemDto {
    exerciseId: string;
    sets: number;
    reps: number;
    weight?: number;
    restSeconds?: number;
}
export declare class CreateWorkoutDto {
    name: string;
    description?: string;
    picture?: string;
    video?: string;
    isGlobal?: boolean;
    exercises?: WorkoutExerciseItemDto[];
}
