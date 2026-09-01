import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExercisesService } from './exercises.service';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    findAll(user: AuthenticatedUser, limit?: string, offset?: string): Promise<import("../../common/entities/excersie.entity").Exercise[]>;
    findOne(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/excersie.entity").Exercise>;
    create(user: AuthenticatedUser, dto: CreateExerciseDto): Promise<import("../../common/entities/excersie.entity").Exercise>;
    update(user: AuthenticatedUser, id: string, dto: UpdateExerciseDto): Promise<import("../../common/entities/excersie.entity").Exercise>;
    remove(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
}
