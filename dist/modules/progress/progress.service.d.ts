import { Repository } from 'typeorm';
import { Progress } from '@app/common/entities/progress.entity';
import { User } from '@app/common/entities/user.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
export declare class ProgressService {
    private readonly progressRepository;
    private readonly usersRepository;
    private readonly coachClientsRepository;
    constructor(progressRepository: Repository<Progress>, usersRepository: Repository<User>, coachClientsRepository: Repository<CoachClient>);
    findByUser(userId: string, limit: number, offset: number): Promise<Progress[]>;
    findOneByUser(userId: string, progressId: string): Promise<Progress>;
    createForUser(userId: string, dto: CreateProgressDto): Promise<Progress>;
    updateForUser(userId: string, progressId: string, dto: UpdateProgressDto): Promise<Progress>;
    removeForUser(userId: string, progressId: string): Promise<{
        deleted: boolean;
    }>;
    findByClient(userId: string, clientId: string): Promise<Progress[]>;
}
