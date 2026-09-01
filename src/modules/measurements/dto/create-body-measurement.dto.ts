import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateBodyMeasurementDto {
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

  @IsDateString()
  @IsNotEmpty()
  date!: string;
}
