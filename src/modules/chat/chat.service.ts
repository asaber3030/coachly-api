import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from 'mongoose';
import { Repository } from 'typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { User } from '@app/common/entities/user.entity';
import { UserRoleEnum } from '@app/common/enums/user.enum';
import {
  ChatConversation,
  ChatConversationDocument,
  ChatMessage,
  ChatMessageDocument,
} from './chat.schema';
import { ChatAttachmentDto, CreateChatMessageDto } from './chat.dto';
import { CloudinaryService } from './cloudinary.service';

type ChatMessageType = 'text' | 'image' | 'video' | 'audio' | 'file';
type UploadedChatFile = {
  originalname?: string;
  mimetype?: string;
  size?: number;
  buffer?: Buffer;
  path?: string;
};

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(ChatConversation.name)
    private readonly conversationModel: Model<ChatConversationDocument>,
    @InjectModel(ChatMessage.name)
    private readonly messageModel: Model<ChatMessageDocument>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(CoachClient)
    private readonly coachClientsRepository: Repository<CoachClient>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async getUserChats(userId: string) {
    return this.buildChatList(userId);
  }

  async getCoachChats(userId: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== UserRoleEnum.COACH) {
      throw new ForbiddenException('Only coaches can access coach chat lists');
    }

    return this.buildChatList(userId);
  }

  async getMessages(conversationId: string, userId: string) {
    const conversation = await this.conversationModel.findById(conversationId).lean();

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (!conversation.participants.includes(userId)) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }

    const messages = await this.messageModel
      .find({ conversationId: String(conversation._id) })
      .sort({ createdAt: 1 })
      .lean();

    await this.markConversationRead(String(conversation._id), userId);

    return messages;
  }

  async createMessage(
    dto: CreateChatMessageDto & { senderId: string; senderRole: 'user' | 'coach' },
  ) {
    const hasConversation = !!dto.conversationId;
    const hasPeer = !!dto.peerId;

    if (!hasConversation && !hasPeer) {
      throw new BadRequestException(
        'You need either a conversationId or a peerId to send a message',
      );
    }

    const senderId = dto.senderId;
    const senderRole = dto.senderRole;

    let conversation = null as any;

    if (dto.conversationId) {
      conversation = await this.conversationModel.findById(dto.conversationId);
    } else if (dto.peerId) {
      conversation = await this.getOrCreateConversation(senderId, dto.peerId);
    }

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    const participants = Array.isArray(conversation.participants) ? conversation.participants : [];

    if (!participants.includes(senderId)) {
      throw new ForbiddenException('You are not allowed to send messages in this conversation');
    }

    const normalizedText = (dto.text ?? '').trim();
    const attachments = dto.attachments ?? [];

    if (!normalizedText && attachments.length === 0) {
      throw new BadRequestException('Message content is required');
    }

    const createdMessage: any = await this.messageModel.create({
      conversationId: String(conversation._id),
      senderId,
      senderRole,
      type: this.resolveMessageType(dto.type, attachments),
      body: normalizedText,
      attachments,
      seenBy: [senderId],
    });

    const unreadBy = participants.filter((participantId: string) => participantId !== senderId);
    const createdAt = (createdMessage as any)?.createdAt ?? new Date();

    await this.conversationModel.updateOne(
      { _id: conversation._id },
      {
        $set: {
          lastMessageSnippet: normalizedText || this.getSnippetFromAttachments(attachments),
          lastMessageAt: createdAt,
        },
        $addToSet: { unreadBy: { $each: unreadBy } },
      },
    );

    const savedMessage = (createdMessage as any)?.toObject?.() ?? createdMessage;

    return {
      id: String(savedMessage._id),
      conversationId: String(conversation._id),
      participants,
      senderId: savedMessage.senderId,
      senderRole: savedMessage.senderRole,
      type: savedMessage.type,
      body: savedMessage.body,
      attachments: savedMessage.attachments || [],
      seenBy: savedMessage.seenBy || [senderId],
      createdAt: savedMessage.createdAt,
      updatedAt: savedMessage.updatedAt,
    };
  }

  async markConversationRead(conversationId: string, userId: string) {
    const conversation = await this.conversationModel.findById(conversationId);

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    if (!conversation.participants.includes(userId)) {
      throw new ForbiddenException('You are not a participant in this conversation');
    }

    await this.conversationModel.updateOne(
      { _id: conversation._id },
      { $pull: { unreadBy: userId } },
    );
    await this.messageModel.updateMany(
      { conversationId: String(conversation._id), seenBy: { $ne: userId } },
      { $addToSet: { seenBy: userId } },
    );

    return { conversationId: String(conversation._id), readBy: userId, success: true };
  }

  async uploadFiles(files: UploadedChatFile[] = []) {
    return this.cloudinaryService.uploadFiles(files as any);
  }

  private async buildChatList(userId: string) {
    const conversations = await this.conversationModel
      .find({ participants: userId })
      .sort({ lastMessageAt: -1, createdAt: -1 })
      .lean();

    const chats = await Promise.all(
      conversations.map(async (conversation) => {
        const peerId = conversation.participants.find(
          (participantId: string) => participantId !== userId,
        );
        const peer = peerId
          ? await this.usersRepository.findOne({ where: { id: peerId }, relations: ['profile'] })
          : null;

        const lastMessage = await this.messageModel
          .findOne({ conversationId: String(conversation._id) })
          .sort({ createdAt: -1 })
          .lean();

        const lastMessageCreatedAt = (lastMessage as any)?.createdAt ?? null;

        return {
          id: String(conversation._id),
          participants: conversation.participants,
          peer: peer
            ? {
                id: peer.id,
                firstName: peer.firstName,
                lastName: peer.lastName,
                email: peer.email,
                role: peer.role,
                avatar: peer.profile?.avatar ?? null,
              }
            : null,
          lastMessage: lastMessage
            ? {
                id: String((lastMessage as any)._id),
                conversationId: String(conversation._id),
                senderId: (lastMessage as any).senderId,
                senderRole: (lastMessage as any).senderRole,
                type: (lastMessage as any).type,
                body: (lastMessage as any).body,
                attachments: (lastMessage as any).attachments || [],
                createdAt: lastMessageCreatedAt,
              }
            : null,
          lastMessageSnippet: conversation.lastMessageSnippet ?? (lastMessage as any)?.body ?? null,
          lastMessageAt: conversation.lastMessageAt ?? lastMessageCreatedAt ?? null,
          unreadCount: Array.isArray(conversation.unreadBy)
            ? conversation.unreadBy.includes(userId)
              ? await this.messageModel.countDocuments({
                  conversationId: String(conversation._id),
                  seenBy: { $ne: userId },
                })
              : 0
            : 0,
        };
      }),
    );

    return chats;
  }

  private async getOrCreateConversation(senderId: string, peerId: string) {
    if (!peerId || peerId === senderId) {
      throw new BadRequestException('A valid peerId is required to start a chat');
    }

    const sender = await this.usersRepository.findOne({ where: { id: senderId } });
    const peer = await this.usersRepository.findOne({ where: { id: peerId } });

    if (!sender || !peer) {
      throw new NotFoundException('Chat participant not found');
    }

    await this.ensureCoachUserLink(senderId, peerId);

    const normalizedParticipants = [senderId, peerId].sort();
    let conversation = await this.conversationModel
      .findOne({ participants: { $all: normalizedParticipants, $size: 2 } })
      .lean();

    if (!conversation) {
      conversation = await this.conversationModel.create({
        participants: normalizedParticipants,
        unreadBy: [peerId],
        lastMessageSnippet: null,
        lastMessageAt: new Date(),
      });
    }

    return conversation;
  }

  private async ensureCoachUserLink(senderId: string, peerId: string) {
    const sender = await this.usersRepository.findOne({ where: { id: senderId } });
    const peer = await this.usersRepository.findOne({ where: { id: peerId } });

    if (!sender || !peer) {
      throw new NotFoundException('Chat participant not found');
    }

    const isSenderCoach = sender.role === UserRoleEnum.COACH;
    const isPeerCoach = peer.role === UserRoleEnum.COACH;

    if (isSenderCoach === isPeerCoach) {
      throw new ForbiddenException('Chats are only allowed between a coach and a user');
    }

    const coachId = isSenderCoach ? senderId : peerId;
    const clientId = isSenderCoach ? peerId : senderId;

    const link = await this.coachClientsRepository.findOne({
      where: {
        coach: { id: coachId },
        client: { id: clientId },
        isActive: true,
      },
      relations: ['coach', 'client'],
    });

    if (!link) {
      throw new ForbiddenException('This coach and user are not connected in the active roster');
    }
  }

  private resolveMessageType(
    type?: string,
    attachments: ChatAttachmentDto[] = [],
  ): ChatMessageType {
    if (
      type === 'text' ||
      type === 'image' ||
      type === 'video' ||
      type === 'audio' ||
      type === 'file'
    ) {
      return type;
    }

    if (attachments.length === 0) {
      return 'text';
    }

    if (attachments.some((item) => (item.resourceType ?? '').includes('video'))) {
      return 'video';
    }

    if (attachments.some((item) => (item.resourceType ?? '').includes('audio'))) {
      return 'audio';
    }

    if (attachments.some((item) => (item.resourceType ?? '').includes('image'))) {
      return 'image';
    }

    return 'file';
  }

  private getSnippetFromAttachments(attachments: ChatAttachmentDto[]) {
    if (attachments.length === 0) {
      return 'Attachment';
    }

    const firstFile = attachments[0];
    return firstFile.fileName || 'Attachment';
  }
}
