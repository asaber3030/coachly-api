import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutsService } from './workouts.service';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    findAll(user: AuthenticatedUser, limit?: string, offset?: string): Promise<import("../../common/entities/workout.entity").Workout[]>;
    findOne(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/workout.entity").Workout>;
    create(user: AuthenticatedUser, dto: CreateWorkoutDto): Promise<import("../../common/entities/workout.entity").Workout>;
    update(user: AuthenticatedUser, id: string, dto: UpdateWorkoutDto): Promise<import("../../common/entities/workout.entity").Workout>;
    remove(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
}
