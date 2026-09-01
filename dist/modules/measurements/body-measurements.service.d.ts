import { Repository } from 'typeorm';
import { BodyMeasurement } from '@app/common/entities/body-measurement.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateBodyMeasurementDto } from './dto/create-body-measurement.dto';
import { UpdateBodyMeasurementDto } from './dto/update-body-measurement.dto';
export declare class BodyMeasurementsService {
    private readonly bodyMeasurementRepository;
    private readonly userRepository;
    private readonly coachClientRepository;
    constructor(bodyMeasurementRepository: Repository<BodyMeasurement>, userRepository: Repository<User>, coachClientRepository: Repository<CoachClient>);
    findByUser(userId: string): Promise<BodyMeasurement[]>;
    findOneByUser(userId: string, measurementId: string): Promise<BodyMeasurement>;
    createForUser(userId: string, dto: CreateBodyMeasurementDto): Promise<BodyMeasurement>;
    updateForUser(userId: string, measurementId: string, dto: UpdateBodyMeasurementDto): Promise<BodyMeasurement>;
    removeForUser(userId: string, measurementId: string): Promise<{
        deleted: boolean;
    }>;
    findByClient(coachId: string, clientId: string): Promise<BodyMeasurement[]>;
}
