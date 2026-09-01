import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class MealRecipeItemUpdateDto {
  @IsOptional()
  @IsUUID()
  recipeId?: string;
}

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => MealRecipeItemUpdateDto)
  recipes?: MealRecipeItemUpdateDto[];
}
