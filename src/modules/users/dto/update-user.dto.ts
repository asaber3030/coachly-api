import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// Updating a user never touches password here — that goes through a dedicated change-password flow.
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {}
