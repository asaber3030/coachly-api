import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { ClientDietAssignment } from '@app/common/entities/client-diet-assignment.entity';
import { ClientExerciseAssignment } from '@app/common/entities/client-exercise-assignment.entity';
import { ClientMealAssignment } from '@app/common/entities/client-meal-assignment.entity';
import { ClientWorkoutAssignment } from '@app/common/entities/client-workout-assignment.entity';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { Diet } from '@app/common/entities/diet.entity';
import { Exercise } from '@app/common/entities/excersie.entity';
import { Invitation } from '@app/common/entities/invitation.entity';
import { Meal } from '@app/common/entities/meal.entity';
import { User } from '@app/common/entities/user.entity';
import { Workout } from '@app/common/entities/workout.entity';
import { CreateInvitationDto } from './dto/create-invitation.dto';

@Injectable()
export class CoachService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Invitation)
    private readonly invitationsRepository: Repository<Invitation>,
    @InjectRepository(CoachClient)
    private readonly coachClientsRepository: Repository<CoachClient>,
    @InjectRepository(Workout)
    private readonly workoutsRepository: Repository<Workout>,
    @InjectRepository(Exercise)
    private readonly exercisesRepository: Repository<Exercise>,
    @InjectRepository(Meal)
    private readonly mealsRepository: Repository<Meal>,
    @InjectRepository(Diet)
    private readonly dietsRepository: Repository<Diet>,
    @InjectRepository(ClientWorkoutAssignment)
    private readonly clientWorkoutAssignmentsRepository: Repository<ClientWorkoutAssignment>,
    @InjectRepository(ClientExerciseAssignment)
    private readonly clientExerciseAssignmentsRepository: Repository<ClientExerciseAssignment>,
    @InjectRepository(ClientMealAssignment)
    private readonly clientMealAssignmentsRepository: Repository<ClientMealAssignment>,
    @InjectRepository(ClientDietAssignment)
    private readonly clientDietAssignmentsRepository: Repository<ClientDietAssignment>,
  ) {}

  async inviteClient(userId: string, dto: CreateInvitationDto): Promise<Invitation> {
    const coach = await this.usersRepository.findOne({ where: { id: userId } });

    if (!coach) {
      throw new NotFoundException('Coach not found');
    }

    const existingUser = await this.usersRepository.findOne({
      where: { email: dto.email.toLowerCase() },
    });
    if (existingUser) {
      const alreadyLinked = await this.coachClientsRepository.findOne({
        where: { coach: { id: userId }, client: { id: existingUser.id } },
        relations: ['coach', 'client'],
      });

      if (alreadyLinked) {
        throw new BadRequestException('This user is already linked to your domain');
      }
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);

    const invite = this.invitationsRepository.create({
      coach,
      email: dto.email.toLowerCase(),
      token,
      expiresAt,
      isAccepted: false,
    });

    return this.invitationsRepository.save(invite);
  }

  async findClients(userId: string, limit: number, offset: number): Promise<CoachClient[]> {
    return this.coachClientsRepository.find({
      where: { coach: { id: userId }, isActive: true },
      relations: ['coach', 'client', 'client.profile'],
      order: { startedAt: 'DESC' },
      take: limit,
      skip: offset,
    });
  }

  async findInvitations(userId: string): Promise<Invitation[]> {
    return this.invitationsRepository.find({
      where: { coach: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async assignWorkoutToClient(
    userId: string,
    clientId: string,
    workoutId: string,
    notes?: string,
  ): Promise<ClientWorkoutAssignment> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const workout = await this.workoutsRepository.findOne({
      where: [
        { id: workoutId, createdBy: { id: userId } },
        { id: workoutId, isGlobal: true },
      ],
      relations: ['createdBy'],
    });

    if (!workout) {
      throw new NotFoundException('Workout not found');
    }

    const existing = await this.clientWorkoutAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, workout: { id: workoutId } },
      relations: ['coachClient', 'workout'],
    });

    if (existing) {
      existing.notes = notes ?? existing.notes;
      existing.isActive = true;
      return this.clientWorkoutAssignmentsRepository.save(existing);
    }

    const assignment = this.clientWorkoutAssignmentsRepository.create({
      coachClient,
      workout,
      notes,
      isActive: true,
    });

    return this.clientWorkoutAssignmentsRepository.save(assignment);
  }

  async removeWorkoutAssignment(
    userId: string,
    clientId: string,
    workoutId: string,
  ): Promise<{ deleted: boolean }> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const assignment = await this.clientWorkoutAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, workout: { id: workoutId } },
      relations: ['coachClient', 'workout'],
    });

    if (!assignment) {
      throw new NotFoundException('Workout assignment not found');
    }

    await this.clientWorkoutAssignmentsRepository.remove(assignment);
    return { deleted: true };
  }

  async listWorkoutAssignments(
    userId: string,
    clientId: string,
  ): Promise<ClientWorkoutAssignment[]> {
    await this.getCoachClient(userId, clientId);

    return this.clientWorkoutAssignmentsRepository.find({
      where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
      relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'workout'],
      order: { createdAt: 'DESC' },
    });
  }

  async assignExerciseToClient(
    userId: string,
    clientId: string,
    exerciseId: string,
    notes?: string,
  ): Promise<ClientExerciseAssignment> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const exercise = await this.exercisesRepository.findOne({
      where: [
        { id: exerciseId, createdBy: { id: userId } },
        { id: exerciseId, isGlobal: true },
      ],
      relations: ['createdBy'],
    });

    if (!exercise) {
      throw new NotFoundException('Exercise not found');
    }

    const existing = await this.clientExerciseAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, exercise: { id: exerciseId } },
      relations: ['coachClient', 'exercise'],
    });

    if (existing) {
      existing.notes = notes ?? existing.notes;
      existing.isActive = true;
      return this.clientExerciseAssignmentsRepository.save(existing);
    }

    const assignment = this.clientExerciseAssignmentsRepository.create({
      coachClient,
      exercise,
      notes,
      isActive: true,
    });

    return this.clientExerciseAssignmentsRepository.save(assignment);
  }

  async removeExerciseAssignment(
    userId: string,
    clientId: string,
    exerciseId: string,
  ): Promise<{ deleted: boolean }> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const assignment = await this.clientExerciseAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, exercise: { id: exerciseId } },
      relations: ['coachClient', 'exercise'],
    });

    if (!assignment) {
      throw new NotFoundException('Exercise assignment not found');
    }

    await this.clientExerciseAssignmentsRepository.remove(assignment);
    return { deleted: true };
  }

  async listExerciseAssignments(
    userId: string,
    clientId: string,
  ): Promise<ClientExerciseAssignment[]> {
    await this.getCoachClient(userId, clientId);

    return this.clientExerciseAssignmentsRepository.find({
      where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
      relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'exercise'],
      order: { createdAt: 'DESC' },
    });
  }

  async assignMealToClient(
    userId: string,
    clientId: string,
    mealId: string,
    notes?: string,
  ): Promise<ClientMealAssignment> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const meal = await this.mealsRepository.findOne({
      where: [
        { id: mealId, createdBy: { id: userId } },
        { id: mealId, isGlobal: true },
      ],
      relations: ['createdBy'],
    });

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    const existing = await this.clientMealAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, meal: { id: mealId } },
      relations: ['coachClient', 'meal'],
    });

    if (existing) {
      existing.notes = notes ?? existing.notes;
      existing.isActive = true;
      return this.clientMealAssignmentsRepository.save(existing);
    }

    const assignment = this.clientMealAssignmentsRepository.create({
      coachClient,
      meal,
      notes,
      isActive: true,
    });

    return this.clientMealAssignmentsRepository.save(assignment);
  }

  async removeMealAssignment(
    userId: string,
    clientId: string,
    mealId: string,
  ): Promise<{ deleted: boolean }> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const assignment = await this.clientMealAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, meal: { id: mealId } },
      relations: ['coachClient', 'meal'],
    });

    if (!assignment) {
      throw new NotFoundException('Meal assignment not found');
    }

    await this.clientMealAssignmentsRepository.remove(assignment);
    return { deleted: true };
  }

  async listMealAssignments(userId: string, clientId: string): Promise<ClientMealAssignment[]> {
    await this.getCoachClient(userId, clientId);

    return this.clientMealAssignmentsRepository.find({
      where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
      relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'meal'],
      order: { createdAt: 'DESC' },
    });
  }

  async assignDietToClient(
    userId: string,
    clientId: string,
    dietId: string,
    notes?: string,
  ): Promise<ClientDietAssignment> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const diet = await this.dietsRepository.findOne({
      where: [
        { id: dietId, createdBy: { id: userId } },
        { id: dietId, isGlobal: true },
      ],
      relations: ['createdBy'],
    });

    if (!diet) {
      throw new NotFoundException('Diet not found');
    }

    const existing = await this.clientDietAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, diet: { id: dietId } },
      relations: ['coachClient', 'diet'],
    });

    if (existing) {
      existing.notes = notes ?? existing.notes;
      existing.isActive = true;
      return this.clientDietAssignmentsRepository.save(existing);
    }

    const assignment = this.clientDietAssignmentsRepository.create({
      coachClient,
      diet,
      notes,
      isActive: true,
    });

    return this.clientDietAssignmentsRepository.save(assignment);
  }

  async removeDietAssignment(
    userId: string,
    clientId: string,
    dietId: string,
  ): Promise<{ deleted: boolean }> {
    const coachClient = await this.getCoachClient(userId, clientId);
    const assignment = await this.clientDietAssignmentsRepository.findOne({
      where: { coachClient: { id: coachClient.id }, diet: { id: dietId } },
      relations: ['coachClient', 'diet'],
    });

    if (!assignment) {
      throw new NotFoundException('Diet assignment not found');
    }

    await this.clientDietAssignmentsRepository.remove(assignment);
    return { deleted: true };
  }

  async listDietAssignments(userId: string, clientId: string): Promise<ClientDietAssignment[]> {
    await this.getCoachClient(userId, clientId);

    return this.clientDietAssignmentsRepository.find({
      where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
      relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'diet'],
      order: { createdAt: 'DESC' },
    });
  }

  async acceptInvite(
    userId: string,
    token: string,
  ): Promise<{ accepted: boolean; coachId?: string }> {
    const invitation = await this.invitationsRepository.findOne({
      where: {
        token,
        email: (await this.usersRepository.findOne({ where: { id: userId } }))?.email,
      },
      relations: ['coach', 'user'],
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation has expired');
    }

    if (invitation.isAccepted) {
      throw new BadRequestException('Invitation already accepted');
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const alreadyLinked = await this.coachClientsRepository.findOne({
      where: { coach: { id: invitation.coach.id }, client: { id: user.id } },
      relations: ['coach', 'client'],
    });

    if (alreadyLinked) {
      throw new BadRequestException('You are already linked to this coach');
    }

    const assignment = this.coachClientsRepository.create({
      coach: invitation.coach,
      client: user,
      isActive: true,
    });

    await this.coachClientsRepository.save(assignment);
    invitation.isAccepted = true;
    invitation.user = user;
    await this.invitationsRepository.save(invitation);

    return { accepted: true, coachId: invitation.coach.id };
  }

  private async getCoachClient(userId: string, clientId: string): Promise<CoachClient> {
    const coachClient = await this.coachClientsRepository.findOne({
      where: { coach: { id: userId }, client: { id: clientId }, isActive: true },
      relations: ['coach', 'client'],
    });

    if (!coachClient) {
      throw new NotFoundException('Client is not assigned to this coach');
    }

    return coachClient;
  }
}
