import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BodyMeasurement } from '@app/common/entities/body-measurement.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateBodyMeasurementDto } from './dto/create-body-measurement.dto';
import { UpdateBodyMeasurementDto } from './dto/update-body-measurement.dto';

@Injectable()
export class BodyMeasurementsService {
  constructor(
    @InjectRepository(BodyMeasurement)
    private readonly bodyMeasurementRepository: Repository<BodyMeasurement>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CoachClient)
    private readonly coachClientRepository: Repository<CoachClient>,
  ) {}

  async findByUser(userId: string): Promise<BodyMeasurement[]> {
    return this.bodyMeasurementRepository.find({
      where: { user: { id: userId } },
      order: { date: 'DESC' },
    });
  }

  async findOneByUser(userId: string, measurementId: string): Promise<BodyMeasurement> {
    const measurement = await this.bodyMeasurementRepository.findOne({
      where: { id: measurementId, user: { id: userId } },
      relations: ['user'],
    });

    if (!measurement) {
      throw new NotFoundException('Body measurement not found');
    }

    return measurement;
  }

  async createForUser(userId: string, dto: CreateBodyMeasurementDto): Promise<BodyMeasurement> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const measurement = this.bodyMeasurementRepository.create({
      user,
      chest: dto.chest,
      waist: dto.waist,
      hips: dto.hips,
      arms: dto.arms,
      thighs: dto.thighs,
      date: new Date(dto.date),
    });

    return this.bodyMeasurementRepository.save(measurement);
  }

  async updateForUser(
    userId: string,
    measurementId: string,
    dto: UpdateBodyMeasurementDto,
  ): Promise<BodyMeasurement> {
    const measurement = await this.findOneByUser(userId, measurementId);

    Object.assign(measurement, {
      chest: dto.chest ?? measurement.chest,
      waist: dto.waist ?? measurement.waist,
      hips: dto.hips ?? measurement.hips,
      arms: dto.arms ?? measurement.arms,
      thighs: dto.thighs ?? measurement.thighs,
      date: dto.date ? new Date(dto.date) : measurement.date,
    });

    return this.bodyMeasurementRepository.save(measurement);
  }

  async removeForUser(userId: string, measurementId: string): Promise<{ deleted: boolean }> {
    const measurement = await this.findOneByUser(userId, measurementId);
    await this.bodyMeasurementRepository.remove(measurement);

    return { deleted: true };
  }

  async findByClient(coachId: string, clientId: string): Promise<BodyMeasurement[]> {
    const relation = await this.coachClientRepository.findOne({
      where: { coach: { id: coachId }, client: { id: clientId }, isActive: true },
      relations: ['coach', 'client'],
    });

    if (!relation) {
      throw new NotFoundException('This client is not assigned to your domain');
    }

    return this.bodyMeasurementRepository.find({
      where: { user: { id: clientId } },
      relations: ['user'],
      order: { date: 'DESC' },
    });
  }
}
