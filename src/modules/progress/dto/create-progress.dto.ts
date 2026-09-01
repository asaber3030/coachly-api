import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProgressDto {
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

  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
