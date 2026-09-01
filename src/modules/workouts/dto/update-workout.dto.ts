import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class WorkoutExerciseItemUpdateDto {
  @IsOptional()
  @IsUUID()
  exerciseId?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  sets?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  reps?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  restSeconds?: number;
}

export class UpdateWorkoutDto {
  @IsOptional()
  @IsString()
  name?: string;

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
  @Type(() => WorkoutExerciseItemUpdateDto)
  exercises?: WorkoutExerciseItemUpdateDto[];
}
