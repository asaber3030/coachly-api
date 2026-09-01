import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    getMyProgress(user: AuthenticatedUser, limit?: string, offset?: string): Promise<import("../../common/entities/progress.entity").Progress[]>;
    getProgressById(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/progress.entity").Progress>;
    createProgress(user: AuthenticatedUser, dto: CreateProgressDto): Promise<import("../../common/entities/progress.entity").Progress>;
    updateProgress(user: AuthenticatedUser, id: string, dto: UpdateProgressDto): Promise<import("../../common/entities/progress.entity").Progress>;
    removeProgress(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
    getClientProgress(user: AuthenticatedUser, clientId: string): Promise<import("../../common/entities/progress.entity").Progress[]>;
}
