import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProgressDto {
  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  bodyFat?: number;

  @IsOptional()
  @IsNumber()
  muscleMass?: number;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsDateString()
  date?: string;
}
