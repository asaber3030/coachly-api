import { Repository } from 'typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { ProgressPhoto } from '@app/common/entities/progress-photo.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateProgressPhotoDto } from './dto/create-progress-photo.dto';
import { UpdateProgressPhotoDto } from './dto/update-progress-photo.dto';
export declare class ProgressPhotosService {
    private readonly photosRepository;
    private readonly userRepository;
    private readonly coachClientRepository;
    constructor(photosRepository: Repository<ProgressPhoto>, userRepository: Repository<User>, coachClientRepository: Repository<CoachClient>);
    findByUser(userId: string): Promise<ProgressPhoto[]>;
    findOneByUser(userId: string, photoId: string): Promise<ProgressPhoto>;
    createForUser(userId: string, dto: CreateProgressPhotoDto): Promise<ProgressPhoto>;
    updateForUser(userId: string, photoId: string, dto: UpdateProgressPhotoDto): Promise<ProgressPhoto>;
    removeForUser(userId: string, photoId: string): Promise<{
        deleted: boolean;
    }>;
    findByClient(coachId: string, clientId: string): Promise<ProgressPhoto[]>;
}
