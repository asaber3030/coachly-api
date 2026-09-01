import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateProgressPhotoDto } from './dto/create-progress-photo.dto';
import { UpdateProgressPhotoDto } from './dto/update-progress-photo.dto';
import { ProgressPhotosService } from './progress-photos.service';
export declare class ProgressPhotosController {
    private readonly progressPhotosService;
    constructor(progressPhotosService: ProgressPhotosService);
    getMyPhotos(user: AuthenticatedUser): Promise<import("../../common/entities/progress-photo.entity").ProgressPhoto[]>;
    getPhotoById(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/progress-photo.entity").ProgressPhoto>;
    createPhoto(user: AuthenticatedUser, dto: CreateProgressPhotoDto): Promise<import("../../common/entities/progress-photo.entity").ProgressPhoto>;
    updatePhoto(user: AuthenticatedUser, id: string, dto: UpdateProgressPhotoDto): Promise<import("../../common/entities/progress-photo.entity").ProgressPhoto>;
    removePhoto(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
    getClientPhotos(user: AuthenticatedUser, clientId: string): Promise<import("../../common/entities/progress-photo.entity").ProgressPhoto[]>;
}
