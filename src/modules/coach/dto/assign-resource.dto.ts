import { IsOptional, IsString } from 'class-validator';

export class AssignResourceDto {
  @IsOptional()
  @IsString()
  notes?: string;
}
