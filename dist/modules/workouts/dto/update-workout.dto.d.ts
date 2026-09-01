export declare class WorkoutExerciseItemUpdateDto {
    exerciseId?: string;
    sets?: number;
    reps?: number;
    weight?: number;
    restSeconds?: number;
}
export declare class UpdateWorkoutDto {
    name?: string;
    description?: string;
    picture?: string;
    video?: string;
    isGlobal?: boolean;
    exercises?: WorkoutExerciseItemUpdateDto[];
}
