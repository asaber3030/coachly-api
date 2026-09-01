import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRoleEnum } from '@app/common/enums/user.enum';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateBodyMeasurementDto } from './dto/create-body-measurement.dto';
import { UpdateBodyMeasurementDto } from './dto/update-body-measurement.dto';
import { BodyMeasurementsService } from './body-measurements.service';

@Controller('body-measurements')
@UseGuards(RolesGuard)
export class BodyMeasurementsController {
  constructor(private readonly bodyMeasurementsService: BodyMeasurementsService) {}

  @Get()
  getMyMeasurements(@CurrentUser() user: AuthenticatedUser) {
    return this.bodyMeasurementsService.findByUser(user.id);
  }

  @Get(':id')
  getMeasurementById(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.bodyMeasurementsService.findOneByUser(user.id, id);
  }

  @Post()
  createMeasurement(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateBodyMeasurementDto) {
    return this.bodyMeasurementsService.createForUser(user.id, dto);
  }

  @Patch(':id')
  updateMeasurement(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateBodyMeasurementDto,
  ) {
    return this.bodyMeasurementsService.updateForUser(user.id, id, dto);
  }

  @Delete(':id')
  removeMeasurement(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.bodyMeasurementsService.removeForUser(user.id, id);
  }

  @Get('coach/:clientId')
  @Roles(UserRoleEnum.COACH)
  getClientMeasurements(
    @CurrentUser() user: AuthenticatedUser,
    @Param('clientId') clientId: string,
  ) {
    return this.bodyMeasurementsService.findByClient(user.id, clientId);
  }
}
