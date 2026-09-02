import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { User } from '@app/common/entities/user.entity';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { CloudinaryService } from './cloudinary.service';
import {
  ChatConversation,
  ChatConversationSchema,
  ChatMessage,
  ChatMessageSchema,
} from './chat.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: ChatConversation.name, schema: ChatConversationSchema },
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
    TypeOrmModule.forFeature([User, CoachClient]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, CloudinaryService],
  exports: [ChatService],
})
export class ChatModule {}
