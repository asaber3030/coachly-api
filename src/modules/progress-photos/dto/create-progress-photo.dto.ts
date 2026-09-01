import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgressPhotoDto {
  @IsString()
  @IsNotEmpty()
  imageUrl!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
