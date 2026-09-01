import { Repository } from 'typeorm';
import { Diet } from '@app/common/entities/diet.entity';
import { DietItem } from '@app/common/entities/diet-item.entity';
import { Meal } from '@app/common/entities/meal.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
export declare class DietsService {
    private readonly dietsRepository;
    private readonly dietItemsRepository;
    private readonly mealsRepository;
    private readonly usersRepository;
    constructor(dietsRepository: Repository<Diet>, dietItemsRepository: Repository<DietItem>, mealsRepository: Repository<Meal>, usersRepository: Repository<User>);
    findAllForCoach(userId: string, limit: number, offset: number): Promise<Diet[]>;
    findOneForCoach(userId: string, dietId: string): Promise<Diet>;
    createForCoach(userId: string, dto: CreateDietDto): Promise<Diet>;
    updateForCoach(userId: string, dietId: string, dto: UpdateDietDto): Promise<Diet>;
    removeForCoach(userId: string, dietId: string): Promise<{
        deleted: boolean;
    }>;
}
