import { IsOptional, IsString } from 'class-validator';

export class UpdateProgressPhotoDto {
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
