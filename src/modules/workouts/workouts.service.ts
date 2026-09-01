import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Exercise } from '@app/common/entities/excersie.entity';
import { User } from '@app/common/entities/user.entity';
import { Workout } from '@app/common/entities/workout.entity';
import { WorkoutExercise } from '@app/common/entities/workout-excecies.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
    @InjectRepository(WorkoutExercise)
    private readonly workoutExercisesRepository: Repository<WorkoutExercise>,
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAllByCoach(userId: string, limit: number, offset: number): Promise<Workout[]> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    return this.workoutsRepository.find({
      where: [{ createdBy: { id: userId } }, { isGlobal: true }],
      relations: ['createdBy', 'group', 'exercises', 'exercises.exercise'],
      order: { createdAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findOneForCoach(userId: string, workoutId: string): Promise<Workout> {
    const workout = await this.workoutsRepository.findOne({
      where: [
        { id: workoutId, createdBy: { id: userId } },
        { id: workoutId, isGlobal: true },
      ],
      relations: ['createdBy', 'group', 'exercises', 'exercises.exercise'],
    });

    if (!workout) {
      throw new NotFoundException('Workout not found');
    }

    return workout;
  }

  async createForCoach(userId: string, dto: CreateWorkoutDto): Promise<Workout> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    const workout = this.workoutsRepository.create({
      name: dto.name,
      description: dto.description,
      picture: dto.picture,
      video: dto.video,
      isGlobal: dto.isGlobal,
      createdBy: coach,
    });

    const savedWorkout = await this.workoutsRepository.save(workout);

    if (dto.exercises && dto.exercises.length > 0) {
      const exerciseIds = dto.exercises.map((item) => item.exerciseId);
      const exercises = await this.exercisesRepository.findBy({ id: In(exerciseIds) });

      if (exercises.length !== exerciseIds.length) {
        throw new NotFoundException('One or more exercises were not found');
      }

      const items = dto.exercises.map((item) => {
        const exercise = exercises.find((entry) => entry.id === item.exerciseId);

        return this.workoutExercisesRepository.create({
          workout: savedWorkout,
          exercise: exercise as Exercise,
          sets: item.sets,
          reps: item.reps,
          weight: item.weight,
          restSeconds: item.restSeconds,
        });
      });

      await this.workoutExercisesRepository.save(items);
      savedWorkout.exercises = items;
    }

    return savedWorkout;
  }

  async updateForCoach(userId: string, workoutId: string, dto: UpdateWorkoutDto): Promise<Workout> {
    const workout = await this.findOneForCoach(userId, workoutId);

    Object.assign(workout, {
      name: dto.name ?? workout.name,
      description: dto.description ?? workout.description,
      picture: dto.picture ?? workout.picture,
      video: dto.video ?? workout.video,
      isGlobal: dto.isGlobal,
    });

    const savedWorkout = await this.workoutsRepository.save(workout);

    if (dto.exercises) {
      await this.workoutExercisesRepository.delete({ workout: { id: workout.id } as Workout });

      if (dto.exercises.length > 0) {
        const exercises = await this.exercisesRepository.findBy({
          id: In(dto.exercises.map((item) => item.exerciseId)),
        });

        if (exercises.length !== dto.exercises.length) {
          throw new NotFoundException('One or more exercises were not found');
        }

        const nextItems = dto.exercises.map((item) => {
          const exercise = exercises.find((entry) => entry.id === item.exerciseId);

          return this.workoutExercisesRepository.create({
            workout: savedWorkout,
            exercise: exercise as Exercise,
            sets: item.sets,
            reps: item.reps,
            weight: item.weight,
            restSeconds: item.restSeconds,
          });
        });

        await this.workoutExercisesRepository.save(nextItems);
      }
    }

    return this.findOneForCoach(userId, workoutId);
  }

  async removeForCoach(userId: string, workoutId: string): Promise<{ deleted: boolean }> {
    const workout = await this.findOneForCoach(userId, workoutId);
    await this.workoutsRepository.remove(workout);

    return { deleted: true };
  }
}
