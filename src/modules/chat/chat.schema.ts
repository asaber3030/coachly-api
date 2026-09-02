import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatConversationDocument = ChatConversation & Document;
export type ChatMessageDocument = ChatMessage & Document;

@Schema({ collection: 'chat_conversations', timestamps: true })
export class ChatConversation {
  @Prop({ type: [String], required: true, index: true })
  participants!: string[];

  @Prop({ type: String, default: null })
  lastMessageSnippet?: string | null;

  @Prop({ type: Date, default: null })
  lastMessageAt?: Date | null;

  @Prop({ type: [String], default: [] })
  unreadBy!: string[];
}

export const ChatConversationSchema = SchemaFactory.createForClass(ChatConversation);
ChatConversationSchema.index({ participants: 1, lastMessageAt: -1 });

export class ChatAttachment {
  @Prop({ required: true })
  url!: string;

  @Prop({ required: true })
  secureUrl!: string;

  @Prop({ required: true })
  resourceType!: string;

  @Prop({ required: true })
  mimeType!: string;

  @Prop({ required: true })
  fileName!: string;

  @Prop({ required: true, default: 0 })
  size!: number;

  @Prop({ required: false, default: null })
  publicId?: string | null;

  @Prop({ required: false, default: null })
  duration?: number | null;
}

@Schema({ collection: 'chat_messages', timestamps: true })
export class ChatMessage {
  @Prop({ required: true, index: true })
  conversationId!: string;

  @Prop({ required: true, index: true })
  senderId!: string;

  @Prop({ required: true, enum: ['user', 'coach'] })
  senderRole!: 'user' | 'coach';

  @Prop({ required: true, enum: ['text', 'image', 'video', 'audio', 'file'], default: 'text' })
  type!: 'text' | 'image' | 'video' | 'audio' | 'file';

  @Prop({ default: '' })
  body!: string;

  @Prop({ type: [Object], default: [] })
  attachments!: ChatAttachment[];

  @Prop({ type: [String], default: [] })
  seenBy!: string[];
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
ChatMessageSchema.index({ conversationId: 1, createdAt: -1 });
