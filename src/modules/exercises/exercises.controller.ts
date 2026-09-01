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
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRoleEnum } from '@app/common/enums/user.enum';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
@UseGuards(RolesGuard)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  @Roles(UserRoleEnum.COACH)
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.exercisesService.findAllForCoach(user.id, Number(limit ?? 20), Number(offset ?? 0));
  }

  @Get(':id')
  @Roles(UserRoleEnum.COACH)
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.exercisesService.findOneForCoach(user.id, id);
  }

  @Post()
  @Roles(UserRoleEnum.COACH)
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateExerciseDto) {
    return this.exercisesService.createForCoach(user.id, dto);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.COACH)
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateExerciseDto,
  ) {
    return this.exercisesService.updateForCoach(user.id, id, dto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.COACH)
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.exercisesService.removeForCoach(user.id, id);
  }
}
