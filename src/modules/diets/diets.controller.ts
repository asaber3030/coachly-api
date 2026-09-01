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
import { CreateDietDto } from './dto/create-diet.dto';
import { UpdateDietDto } from './dto/update-diet.dto';
import { DietsService } from './diets.service';

@Controller('diets')
@UseGuards(RolesGuard)
export class DietsController {
  constructor(private readonly dietsService: DietsService) {}

  @Get()
  @Roles(UserRoleEnum.COACH)
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.dietsService.findAllForCoach(user.id, Number(limit ?? 20), Number(offset ?? 0));
  }

  @Get(':id')
  @Roles(UserRoleEnum.COACH)
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.dietsService.findOneForCoach(user.id, id);
  }

  @Post()
  @Roles(UserRoleEnum.COACH)
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateDietDto) {
    return this.dietsService.createForCoach(user.id, dto);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.COACH)
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateDietDto,
  ) {
    return this.dietsService.updateForCoach(user.id, id, dto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.COACH)
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.dietsService.removeForCoach(user.id, id);
  }
}
