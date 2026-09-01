import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BodyMeasurement } from '@app/common/entities/body-measurement.entity';
import { User } from '@app/common/entities/user.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { BodyMeasurementsController } from './body-measurements.controller';
import { BodyMeasurementsService } from './body-measurements.service';
import { RolesGuard } from '@app/common/guards/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([BodyMeasurement, User, CoachClient])],
  controllers: [BodyMeasurementsController],
  providers: [BodyMeasurementsService, RolesGuard],
  exports: [BodyMeasurementsService],
})
export class BodyMeasurementsModule {}
