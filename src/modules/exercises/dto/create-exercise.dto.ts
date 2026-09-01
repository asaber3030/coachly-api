import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

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
