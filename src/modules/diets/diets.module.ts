import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diet } from '@app/common/entities/diet.entity';
import { DietItem } from '@app/common/entities/diet-item.entity';
import { Meal } from '@app/common/entities/meal.entity';
import { User } from '@app/common/entities/user.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { DietsController } from './diets.controller';
import { DietsService } from './diets.service';

@Module({
  imports: [TypeOrmModule.forFeature([Diet, DietItem, Meal, User])],
  controllers: [DietsController],
  providers: [DietsService, RolesGuard],
  exports: [DietsService],
})
export class DietsModule {}
