import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from '@app/common/entities/progress.entity';
import { User } from '@app/common/entities/user.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(Progress)
    private readonly progressRepository: Repository<Progress>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(CoachClient)
    private readonly coachClientsRepository: Repository<CoachClient>,
  ) {}

  async findByUser(userId: string, limit: number, offset: number): Promise<Progress[]> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.progressRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findOneByUser(userId: string, progressId: string): Promise<Progress> {
    const progress = await this.progressRepository.findOne({
      where: { id: progressId, user: { id: userId } },
      relations: ['user'],
    });

    if (!progress) {
      throw new NotFoundException('Progress entry not found');
    }

    return progress;
  }

  async createForUser(userId: string, dto: CreateProgressDto): Promise<Progress> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const entry = this.progressRepository.create({
      user,
      weight: dto.weight,
      bodyFat: dto.bodyFat,
      muscleMass: dto.muscleMass,
      notes: dto.notes,
      date: new Date(dto.date),
    });

    return this.progressRepository.save(entry);
  }

  async updateForUser(
    userId: string,
    progressId: string,
    dto: UpdateProgressDto,
  ): Promise<Progress> {
    const entry = await this.findOneByUser(userId, progressId);

    Object.assign(entry, {
      weight: dto.weight ?? entry.weight,
      bodyFat: dto.bodyFat ?? entry.bodyFat,
      muscleMass: dto.muscleMass ?? entry.muscleMass,
      notes: dto.notes ?? entry.notes,
      date: dto.date ? new Date(dto.date) : entry.date,
    });

    return this.progressRepository.save(entry);
  }

  async removeForUser(userId: string, progressId: string): Promise<{ deleted: boolean }> {
    const entry = await this.findOneByUser(userId, progressId);
    await this.progressRepository.remove(entry);

    return { deleted: true };
  }

  async findByClient(userId: string, clientId: string): Promise<Progress[]> {
    const coachClient = await this.coachClientsRepository.findOne({
      where: { coach: { id: userId }, client: { id: clientId }, isActive: true },
      relations: ['coach', 'client'],
    });

    if (!coachClient) {
      throw new NotFoundException('This client is not assigned to your domain');
    }

    return this.progressRepository.find({
      where: { user: { id: clientId } },
      relations: ['user'],
      order: { date: 'DESC' },
    });
  }
}
