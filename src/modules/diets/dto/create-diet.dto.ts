import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class DietMealItemDto {
  @IsUUID()
  mealId!: string;

  @IsInt()
  @Min(1)
  dayOfWeek!: number;

  @IsString()
  @IsNotEmpty()
  mealTime!: string;
}

export class CreateDietDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

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
  @Type(() => DietMealItemDto)
  items?: DietMealItemDto[];
}
