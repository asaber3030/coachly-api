import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Meal } from '@app/common/entities/meal.entity';
import { Recipe } from '@app/common/entities/recipe.entity';
import { User } from '@app/common/entities/user.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal, Recipe, User])],
  controllers: [MealsController],
  providers: [MealsService, RolesGuard],
  exports: [MealsService],
})
export class MealsModule {}
