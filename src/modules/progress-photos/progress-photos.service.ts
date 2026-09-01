import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { ProgressPhoto } from '@app/common/entities/progress-photo.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateProgressPhotoDto } from './dto/create-progress-photo.dto';
import { UpdateProgressPhotoDto } from './dto/update-progress-photo.dto';

@Injectable()
export class ProgressPhotosService {
  constructor(
    @InjectRepository(ProgressPhoto)
    private readonly photosRepository: Repository<ProgressPhoto>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CoachClient)
    private readonly coachClientRepository: Repository<CoachClient>,
  ) {}

  async findByUser(userId: string): Promise<ProgressPhoto[]> {
    return this.photosRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOneByUser(userId: string, photoId: string): Promise<ProgressPhoto> {
    const photo = await this.photosRepository.findOne({
      where: { id: photoId, user: { id: userId } },
      relations: ['user'],
    });

    if (!photo) {
      throw new NotFoundException('Progress photo not found');
    }

    return photo;
  }

  async createForUser(userId: string, dto: CreateProgressPhotoDto): Promise<ProgressPhoto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const photo = this.photosRepository.create({
      user,
      imageUrl: dto.imageUrl,
      description: dto.description,
    });

    return this.photosRepository.save(photo);
  }

  async updateForUser(
    userId: string,
    photoId: string,
    dto: UpdateProgressPhotoDto,
  ): Promise<ProgressPhoto> {
    const photo = await this.findOneByUser(userId, photoId);

    Object.assign(photo, {
      imageUrl: dto.imageUrl ?? photo.imageUrl,
      description: dto.description ?? photo.description,
    });

    return this.photosRepository.save(photo);
  }

  async removeForUser(userId: string, photoId: string): Promise<{ deleted: boolean }> {
    const photo = await this.findOneByUser(userId, photoId);
    await this.photosRepository.remove(photo);

    return { deleted: true };
  }

  async findByClient(coachId: string, clientId: string): Promise<ProgressPhoto[]> {
    const relation = await this.coachClientRepository.findOne({
      where: { coach: { id: coachId }, client: { id: clientId }, isActive: true },
      relations: ['coach', 'client'],
    });

    if (!relation) {
      throw new NotFoundException('This client is not assigned to your domain');
    }

    return this.photosRepository.find({
      where: { user: { id: clientId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }
}
