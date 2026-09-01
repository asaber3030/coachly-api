import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUserProfileDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsDateString()
  birthDate?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  goal?: string;
}
