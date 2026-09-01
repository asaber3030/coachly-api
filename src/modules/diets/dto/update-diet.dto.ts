import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class DietMealItemUpdateDto {
  @IsOptional()
  @IsUUID()
  mealId?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  dayOfWeek?: number;

  @IsOptional()
  @IsString()
  mealTime?: string;
}

export class UpdateDietDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => DietMealItemUpdateDto)
  items?: DietMealItemUpdateDto[];
}
