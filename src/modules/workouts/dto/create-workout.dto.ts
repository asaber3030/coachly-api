import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class WorkoutExerciseItemDto {
  @IsUUID()
  exerciseId!: string;

  @IsInt()
  @Min(1)
  sets!: number;

  @IsInt()
  @Min(1)
  reps!: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  restSeconds?: number;
}

export class CreateWorkoutDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseItemDto)
  exercises?: WorkoutExerciseItemDto[];
}
