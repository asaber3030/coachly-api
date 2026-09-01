import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { DietsService } from './diets.service';
export declare class DietsController {
    private readonly dietsService;
    constructor(dietsService: DietsService);
    findAll(user: AuthenticatedUser, limit?: string, offset?: string): Promise<import("../../common/entities/diet.entity").Diet[]>;
    findOne(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/diet.entity").Diet>;
    create(user: AuthenticatedUser, dto: CreateDietDto): Promise<import("../../common/entities/diet.entity").Diet>;
    update(user: AuthenticatedUser, id: string, dto: UpdateDietDto): Promise<import("../../common/entities/diet.entity").Diet>;
    remove(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
}
