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
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { MealsService } from './meals.service';

@Controller('meals')
@UseGuards(RolesGuard)
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get()
  @Roles(UserRoleEnum.COACH)
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.mealsService.findAllForCoach(user.id, Number(limit ?? 20), Number(offset ?? 0));
  }

  @Get(':id')
  @Roles(UserRoleEnum.COACH)
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.mealsService.findOneForCoach(user.id, id);
  }

  @Post()
  @Roles(UserRoleEnum.COACH)
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateMealDto) {
    return this.mealsService.createForCoach(user.id, dto);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.COACH)
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateMealDto,
  ) {
    return this.mealsService.updateForCoach(user.id, id, dto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.COACH)
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.mealsService.removeForCoach(user.id, id);
  }
}
