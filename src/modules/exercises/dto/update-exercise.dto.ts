import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateExerciseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  muscleGroup?: string;

  @IsOptional()
  @IsString()
  equipment?: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  video?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsBoolean()
  isGlobal?: boolean;
}
