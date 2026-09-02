import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChatService } from './chat.service';
import { CreateChatMessageDto } from './chat.dto';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async handleConnection(client: Socket) {
    const authHeader = client.handshake.headers.authorization;
    const token =
      (client.handshake.auth && client.handshake.auth.token) ||
      (typeof authHeader === 'string' ? authHeader.replace(/^Bearer\s+/i, '') : undefined);

    if (token) {
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.getOrThrow<string>('jwt.accessSecret'),
        });
        client.data.user = payload;
      } catch {
        client.disconnect();
        return;
      }
    }

    client.emit('connected', { ok: true, socketId: client.id });
  }

  handleDisconnect(client: Socket) {
    client.emit('disconnected', { ok: true, socketId: client.id });
  }

  @SubscribeMessage('join_conversation')
  async joinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string },
  ) {
    if (!payload?.conversationId) {
      return;
    }

    await client.join(payload.conversationId);
    client.emit('joined_conversation', { conversationId: payload.conversationId });
  }

  @SubscribeMessage('send_message')
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: CreateChatMessageDto & { senderId: string; senderRole: 'user' | 'coach' },
  ) {
    if (!data?.senderId) {
      return;
    }

    const message = await this.chatService.createMessage(data);

    if (message?.conversationId) {
      this.server.to(message.conversationId).emit('new_message', message);
      this.server.to(message.conversationId).emit('chat_notification', {
        conversationId: message.conversationId,
        message,
      });
    }

    return message;
  }

  @SubscribeMessage('mark_read')
  async markRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { conversationId: string; userId: string },
  ) {
    if (!payload?.conversationId || !payload?.userId) {
      return;
    }

    const result = await this.chatService.markConversationRead(
      payload.conversationId,
      payload.userId,
    );
    this.server.to(payload.conversationId).emit('messages_read', result);
    return result;
  }
}
