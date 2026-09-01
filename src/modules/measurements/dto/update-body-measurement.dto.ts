import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class UpdateBodyMeasurementDto {
  @IsOptional()
  @IsNumber()
  chest?: number;

  @IsOptional()
  @IsNumber()
  waist?: number;

  @IsOptional()
  @IsNumber()
  hips?: number;

  @IsOptional()
  @IsNumber()
  arms?: number;

  @IsOptional()
  @IsNumber()
  thighs?: number;

  @IsOptional()
  @IsDateString()
  date?: string;
}
