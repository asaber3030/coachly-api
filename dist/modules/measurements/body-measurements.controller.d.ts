import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateBodyMeasurementDto } from './dto/create-body-measurement.dto';
import { UpdateBodyMeasurementDto } from './dto/update-body-measurement.dto';
import { BodyMeasurementsService } from './body-measurements.service';
export declare class BodyMeasurementsController {
    private readonly bodyMeasurementsService;
    constructor(bodyMeasurementsService: BodyMeasurementsService);
    getMyMeasurements(user: AuthenticatedUser): Promise<import("../../common/entities/body-measurement.entity").BodyMeasurement[]>;
    getMeasurementById(user: AuthenticatedUser, id: string): Promise<import("../../common/entities/body-measurement.entity").BodyMeasurement>;
    createMeasurement(user: AuthenticatedUser, dto: CreateBodyMeasurementDto): Promise<import("../../common/entities/body-measurement.entity").BodyMeasurement>;
    updateMeasurement(user: AuthenticatedUser, id: string, dto: UpdateBodyMeasurementDto): Promise<import("../../common/entities/body-measurement.entity").BodyMeasurement>;
    removeMeasurement(user: AuthenticatedUser, id: string): Promise<{
        deleted: boolean;
    }>;
    getClientMeasurements(user: AuthenticatedUser, clientId: string): Promise<import("../../common/entities/body-measurement.entity").BodyMeasurement[]>;
}
