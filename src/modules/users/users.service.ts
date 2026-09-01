import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { User } from '@app/common/entities/user.entity';
import { UserProfile } from '@app/common/entities/user-profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly profilesRepository: Repository<UserProfile>,
    @InjectRepository(CoachClient)
    private readonly coachClientsRepository: Repository<CoachClient>,
  ) {}

  async getMe(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateMe(userId: string, dto: UpdateUserDto): Promise<User> {
    const user = await this.getMe(userId);

    Object.assign(user, {
      firstName: dto.firstName ?? user.firstName,
      lastName: dto.lastName ?? user.lastName,
    });

    return this.usersRepository.save(user);
  }

  async getProfile(userId: string): Promise<UserProfile> {
    const user = await this.getMe(userId);

    if (!user.profile) {
      const profile = this.profilesRepository.create({ user });
      return this.profilesRepository.save(profile);
    }

    return user.profile;
  }

  async updateProfile(userId: string, dto: UpdateUserProfileDto): Promise<UserProfile> {
    const user = await this.getMe(userId);
    const profile = user.profile ?? this.profilesRepository.create({ user });

    Object.assign(profile, {
      phone: dto.phone ?? profile.phone,
      height: dto.height ?? profile.height,
      birthDate: dto.birthDate ? new Date(dto.birthDate) : profile.birthDate,
      gender: dto.gender ?? profile.gender,
      avatar: dto.avatar ?? profile.avatar,
      goal: dto.goal ?? profile.goal,
    });

    if (!user.profile) {
      user.profile = profile;
      await this.usersRepository.save(user);
    }

    return this.profilesRepository.save(profile);
  }

  async getCoach(userId: string): Promise<User | null> {
    const coachingLink = await this.coachClientsRepository.findOne({
      where: { client: { id: userId }, isActive: true },
      relations: ['coach', 'coach.profile'],
    });

    return coachingLink?.coach ?? null;
  }

  async getClients(userId: string): Promise<User[]> {
    const links = await this.coachClientsRepository.find({
      where: { coach: { id: userId }, isActive: true },
      relations: ['client', 'client.profile'],
      order: { startedAt: 'DESC' },
    });

    return links.map((link) => link.client);
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
