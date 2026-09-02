import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRoleEnum } from '@app/common/enums/user.enum';
import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('me')
  getUserChats(@CurrentUser() user: AuthenticatedUser) {
    return this.chatService.getUserChats(user.id);
  }

  @Get('coach')
  @Roles(UserRoleEnum.COACH)
  getCoachChats(@CurrentUser() user: AuthenticatedUser) {
    return this.chatService.getCoachChats(user.id);
  }

  @Get(':conversationId/messages')
  getMessages(
    @CurrentUser() user: AuthenticatedUser,
    @Param('conversationId') conversationId: string,
  ) {
    return this.chatService.getMessages(conversationId, user.id);
  }

  @Post('send')
  sendMessage(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateChatMessageDto) {
    return this.chatService.createMessage({
      ...dto,
      senderId: user.id,
      senderRole: user.role === UserRoleEnum.COACH ? 'coach' : 'user',
    });
  }

  @Patch(':conversationId/read')
  markRead(
    @CurrentUser() user: AuthenticatedUser,
    @Param('conversationId') conversationId: string,
  ) {
    return this.chatService.markConversationRead(conversationId, user.id);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10))
  uploadFiles(@UploadedFiles() files: any[]) {
    return this.chatService.uploadFiles(files);
  }
}
