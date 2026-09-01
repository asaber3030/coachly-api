import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '@app/common/entities/recipe.entity';
import { User } from '@app/common/entities/user.entity';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, User])],
  controllers: [RecipesController],
  providers: [RecipesService, RolesGuard],
  exports: [RecipesService],
})
export class RecipesModule {}
