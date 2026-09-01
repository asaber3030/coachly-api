import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsEmail()
  email!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  message?: string;
}
