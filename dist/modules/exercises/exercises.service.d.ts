import { Repository } from 'typeorm';
import { Exercise } from '@app/common/entities/excersie.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
export declare class ExercisesService {
    private readonly exercisesRepository;
    private readonly usersRepository;
    constructor(exercisesRepository: Repository<Exercise>, usersRepository: Repository<User>);
    findAllForCoach(userId: string, limit: number, offset: number): Promise<Exercise[]>;
    findOneForCoach(userId: string, exerciseId: string): Promise<Exercise>;
    createForCoach(userId: string, dto: CreateExerciseDto): Promise<Exercise>;
    updateForCoach(userId: string, exerciseId: string, dto: UpdateExerciseDto): Promise<Exercise>;
    removeForCoach(userId: string, exerciseId: string): Promise<{
        deleted: boolean;
    }>;
}
