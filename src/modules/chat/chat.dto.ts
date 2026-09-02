import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';

export enum ChatMessageTypeEnum {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file',
}

export class ChatAttachmentDto {
  @IsString()
  url!: string;

  @IsString()
  secureUrl!: string;

  @IsString()
  resourceType!: string;

  @IsString()
  mimeType!: string;

  @IsString()
  fileName!: string;

  @IsOptional()
  @IsString()
  publicId?: string | null;

  @IsOptional()
  size?: number;

  @IsOptional()
  duration?: number | null;
}

export class CreateChatMessageDto {
  @IsOptional()
  @IsString()
  conversationId?: string;

  @IsOptional()
  @IsString()
  peerId?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsEnum(ChatMessageTypeEnum)
  type?: ChatMessageTypeEnum;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatAttachmentDto)
  attachments?: ChatAttachmentDto[];
}

export class MarkChatReadDto {
  @IsOptional()
  @IsString()
  conversationId?: string;
}
