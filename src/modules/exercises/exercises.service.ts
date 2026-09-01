import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '@app/common/entities/excersie.entity';
import { User } from '@app/common/entities/user.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllForCoach(userId: string, limit: number, offset: number): Promise<Exercise[]> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    return this.exercisesRepository.find({
      where: [{ createdBy: { id: userId } }, { isGlobal: true }],
      relations: ['createdBy', 'group'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findOneForCoach(userId: string, exerciseId: string): Promise<Exercise> {
    const exercise = await this.exercisesRepository.findOne({
      where: [
        { id: exerciseId, createdBy: { id: userId } },
        { id: exerciseId, isGlobal: true },
      ],
      relations: ['createdBy', 'group'],
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    return exercise;
  }

  async createForCoach(userId: string, dto: CreateExerciseDto): Promise<Exercise> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    const exercise = this.exercisesRepository.create({
      name: dto.name,
      muscleGroup: dto.muscleGroup,
      equipment: dto.equipment,
      picture: dto.picture,
      video: dto.video,
      instructions: dto.instructions,
      isGlobal: dto.isGlobal ?? false,
      createdBy: coach,
    });

    return this.exercisesRepository.save(exercise);
  }

  async updateForCoach(
    userId: string,
    exerciseId: string,
    dto: UpdateExerciseDto,
  ): Promise<Exercise> {
    const exercise = await this.findOneForCoach(userId, exerciseId);

    Object.assign(exercise, {
      name: dto.name ?? exercise.name,
      muscleGroup: dto.muscleGroup ?? exercise.muscleGroup,
      equipment: dto.equipment ?? exercise.equipment,
      picture: dto.picture ?? exercise.picture,
      video: dto.video ?? exercise.video,
      instructions: dto.instructions ?? exercise.instructions,
      isGlobal: dto.isGlobal ?? exercise.isGlobal,
    });

    return this.exercisesRepository.save(exercise);
  }

  async removeForCoach(userId: string, exerciseId: string): Promise<{ deleted: boolean }> {
    const exercise = await this.findOneForCoach(userId, exerciseId);
    await this.exercisesRepository.remove(exercise);

    return { deleted: true };
  }
}
