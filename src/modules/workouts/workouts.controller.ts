import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '@app/common/decorators/roles.decorator';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { UserRoleEnum } from '@app/common/enums/user.enum';
import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
@UseGuards(RolesGuard)
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get()
  @Roles(UserRoleEnum.COACH)
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.workoutsService.findAllByCoach(user.id, Number(limit ?? 20), Number(offset ?? 0));
  }

  @Get(':id')
  @Roles(UserRoleEnum.COACH)
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.workoutsService.findOneForCoach(user.id, id);
  }

  @Post()
  @Roles(UserRoleEnum.COACH)
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateWorkoutDto) {
    return this.workoutsService.createForCoach(user.id, dto);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.COACH)
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateWorkoutDto,
  ) {
    return this.workoutsService.updateForCoach(user.id, id, dto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.COACH)
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.workoutsService.removeForCoach(user.id, id);
  }
}
