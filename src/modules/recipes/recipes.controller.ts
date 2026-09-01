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
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
@UseGuards(RolesGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @Roles(UserRoleEnum.COACH)
  findAll(
    @CurrentUser() user: AuthenticatedUser,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.recipesService.findAllForCoach(user.id, Number(limit ?? 20), Number(offset ?? 0));
  }

  @Get(':id')
  @Roles(UserRoleEnum.COACH)
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.recipesService.findOneForCoach(user.id, id);
  }

  @Post()
  @Roles(UserRoleEnum.COACH)
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateRecipeDto) {
    return this.recipesService.createForCoach(user.id, dto);
  }

  @Patch(':id')
  @Roles(UserRoleEnum.COACH)
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateRecipeDto,
  ) {
    return this.recipesService.updateForCoach(user.id, id, dto);
  }

  @Delete(':id')
  @Roles(UserRoleEnum.COACH)
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') id: string) {
    return this.recipesService.removeForCoach(user.id, id);
  }
}
