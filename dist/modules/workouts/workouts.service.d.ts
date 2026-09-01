import { Repository } from 'typeorm';
import { Exercise } from '@app/common/entities/excersie.entity';
import { User } from '@app/common/entities/user.entity';
import { Workout } from '@app/common/entities/workout.entity';
import { WorkoutExercise } from '@app/common/entities/workout-excecies.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
export declare class WorkoutsService {
    private readonly workoutsRepository;
    private readonly workoutExercisesRepository;
    private readonly exercisesRepository;
    private readonly usersRepository;
    constructor(workoutsRepository: Repository<Workout>, workoutExercisesRepository: Repository<WorkoutExercise>, exercisesRepository: Repository<Exercise>, usersRepository: Repository<User>);
    findAllByCoach(userId: string, limit: number, offset: number): Promise<Workout[]>;
    findOneForCoach(userId: string, workoutId: string): Promise<Workout>;
    createForCoach(userId: string, dto: CreateWorkoutDto): Promise<Workout>;
    updateForCoach(userId: string, workoutId: string, dto: UpdateWorkoutDto): Promise<Workout>;
    removeForCoach(userId: string, workoutId: string): Promise<{
        deleted: boolean;
    }>;
}
