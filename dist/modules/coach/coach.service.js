"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoachService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const crypto = require("crypto");
const typeorm_2 = require("typeorm");
const client_diet_assignment_entity_1 = require("../../common/entities/client-diet-assignment.entity");
const client_exercise_assignment_entity_1 = require("../../common/entities/client-exercise-assignment.entity");
const client_meal_assignment_entity_1 = require("../../common/entities/client-meal-assignment.entity");
const client_workout_assignment_entity_1 = require("../../common/entities/client-workout-assignment.entity");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const diet_entity_1 = require("../../common/entities/diet.entity");
const excersie_entity_1 = require("../../common/entities/excersie.entity");
const invitation_entity_1 = require("../../common/entities/invitation.entity");
const meal_entity_1 = require("../../common/entities/meal.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const workout_entity_1 = require("../../common/entities/workout.entity");
let CoachService = class CoachService {
    constructor(usersRepository, invitationsRepository, coachClientsRepository, workoutsRepository, exercisesRepository, mealsRepository, dietsRepository, clientWorkoutAssignmentsRepository, clientExerciseAssignmentsRepository, clientMealAssignmentsRepository, clientDietAssignmentsRepository) {
        this.usersRepository = usersRepository;
        this.invitationsRepository = invitationsRepository;
        this.coachClientsRepository = coachClientsRepository;
        this.workoutsRepository = workoutsRepository;
        this.exercisesRepository = exercisesRepository;
        this.mealsRepository = mealsRepository;
        this.dietsRepository = dietsRepository;
        this.clientWorkoutAssignmentsRepository = clientWorkoutAssignmentsRepository;
        this.clientExerciseAssignmentsRepository = clientExerciseAssignmentsRepository;
        this.clientMealAssignmentsRepository = clientMealAssignmentsRepository;
        this.clientDietAssignmentsRepository = clientDietAssignmentsRepository;
    }
    async inviteClient(userId, dto) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
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
                throw new common_1.BadRequestException('This user is already linked to your domain');
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
    async findClients(userId, limit, offset) {
        return this.coachClientsRepository.find({
            where: { coach: { id: userId }, isActive: true },
            relations: ['coach', 'client', 'client.profile'],
            order: { startedAt: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async findInvitations(userId) {
        return this.invitationsRepository.find({
            where: { coach: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
    async assignWorkoutToClient(userId, clientId, workoutId, notes) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const workout = await this.workoutsRepository.findOne({
            where: [
                { id: workoutId, createdBy: { id: userId } },
                { id: workoutId, isGlobal: true },
            ],
            relations: ['createdBy'],
        });
        if (!workout) {
            throw new common_1.NotFoundException('Workout not found');
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
    async removeWorkoutAssignment(userId, clientId, workoutId) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const assignment = await this.clientWorkoutAssignmentsRepository.findOne({
            where: { coachClient: { id: coachClient.id }, workout: { id: workoutId } },
            relations: ['coachClient', 'workout'],
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Workout assignment not found');
        }
        await this.clientWorkoutAssignmentsRepository.remove(assignment);
        return { deleted: true };
    }
    async listWorkoutAssignments(userId, clientId) {
        await this.getCoachClient(userId, clientId);
        return this.clientWorkoutAssignmentsRepository.find({
            where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
            relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'workout'],
            order: { createdAt: 'DESC' },
        });
    }
    async assignExerciseToClient(userId, clientId, exerciseId, notes) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const exercise = await this.exercisesRepository.findOne({
            where: [
                { id: exerciseId, createdBy: { id: userId } },
                { id: exerciseId, isGlobal: true },
            ],
            relations: ['createdBy'],
        });
        if (!exercise) {
            throw new common_1.NotFoundException('Exercise not found');
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
    async removeExerciseAssignment(userId, clientId, exerciseId) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const assignment = await this.clientExerciseAssignmentsRepository.findOne({
            where: { coachClient: { id: coachClient.id }, exercise: { id: exerciseId } },
            relations: ['coachClient', 'exercise'],
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Exercise assignment not found');
        }
        await this.clientExerciseAssignmentsRepository.remove(assignment);
        return { deleted: true };
    }
    async listExerciseAssignments(userId, clientId) {
        await this.getCoachClient(userId, clientId);
        return this.clientExerciseAssignmentsRepository.find({
            where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
            relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'exercise'],
            order: { createdAt: 'DESC' },
        });
    }
    async assignMealToClient(userId, clientId, mealId, notes) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const meal = await this.mealsRepository.findOne({
            where: [
                { id: mealId, createdBy: { id: userId } },
                { id: mealId, isGlobal: true },
            ],
            relations: ['createdBy'],
        });
        if (!meal) {
            throw new common_1.NotFoundException('Meal not found');
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
    async removeMealAssignment(userId, clientId, mealId) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const assignment = await this.clientMealAssignmentsRepository.findOne({
            where: { coachClient: { id: coachClient.id }, meal: { id: mealId } },
            relations: ['coachClient', 'meal'],
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Meal assignment not found');
        }
        await this.clientMealAssignmentsRepository.remove(assignment);
        return { deleted: true };
    }
    async listMealAssignments(userId, clientId) {
        await this.getCoachClient(userId, clientId);
        return this.clientMealAssignmentsRepository.find({
            where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
            relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'meal'],
            order: { createdAt: 'DESC' },
        });
    }
    async assignDietToClient(userId, clientId, dietId, notes) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const diet = await this.dietsRepository.findOne({
            where: [
                { id: dietId, createdBy: { id: userId } },
                { id: dietId, isGlobal: true },
            ],
            relations: ['createdBy'],
        });
        if (!diet) {
            throw new common_1.NotFoundException('Diet not found');
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
    async removeDietAssignment(userId, clientId, dietId) {
        const coachClient = await this.getCoachClient(userId, clientId);
        const assignment = await this.clientDietAssignmentsRepository.findOne({
            where: { coachClient: { id: coachClient.id }, diet: { id: dietId } },
            relations: ['coachClient', 'diet'],
        });
        if (!assignment) {
            throw new common_1.NotFoundException('Diet assignment not found');
        }
        await this.clientDietAssignmentsRepository.remove(assignment);
        return { deleted: true };
    }
    async listDietAssignments(userId, clientId) {
        await this.getCoachClient(userId, clientId);
        return this.clientDietAssignmentsRepository.find({
            where: { coachClient: { coach: { id: userId }, client: { id: clientId } }, isActive: true },
            relations: ['coachClient', 'coachClient.coach', 'coachClient.client', 'diet'],
            order: { createdAt: 'DESC' },
        });
    }
    async acceptInvite(userId, token) {
        const invitation = await this.invitationsRepository.findOne({
            where: {
                token,
                email: (await this.usersRepository.findOne({ where: { id: userId } }))?.email,
            },
            relations: ['coach', 'user'],
        });
        if (!invitation) {
            throw new common_1.NotFoundException('Invitation not found');
        }
        if (invitation.expiresAt < new Date()) {
            throw new common_1.BadRequestException('Invitation has expired');
        }
        if (invitation.isAccepted) {
            throw new common_1.BadRequestException('Invitation already accepted');
        }
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const alreadyLinked = await this.coachClientsRepository.findOne({
            where: { coach: { id: invitation.coach.id }, client: { id: user.id } },
            relations: ['coach', 'client'],
        });
        if (alreadyLinked) {
            throw new common_1.BadRequestException('You are already linked to this coach');
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
    async getCoachClient(userId, clientId) {
        const coachClient = await this.coachClientsRepository.findOne({
            where: { coach: { id: userId }, client: { id: clientId }, isActive: true },
            relations: ['coach', 'client'],
        });
        if (!coachClient) {
            throw new common_1.NotFoundException('Client is not assigned to this coach');
        }
        return coachClient;
    }
};
exports.CoachService = CoachService;
exports.CoachService = CoachService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(invitation_entity_1.Invitation)),
    __param(2, (0, typeorm_1.InjectRepository)(coach_client_entity_1.CoachClient)),
    __param(3, (0, typeorm_1.InjectRepository)(workout_entity_1.Workout)),
    __param(4, (0, typeorm_1.InjectRepository)(excersie_entity_1.Exercise)),
    __param(5, (0, typeorm_1.InjectRepository)(meal_entity_1.Meal)),
    __param(6, (0, typeorm_1.InjectRepository)(diet_entity_1.Diet)),
    __param(7, (0, typeorm_1.InjectRepository)(client_workout_assignment_entity_1.ClientWorkoutAssignment)),
    __param(8, (0, typeorm_1.InjectRepository)(client_exercise_assignment_entity_1.ClientExerciseAssignment)),
    __param(9, (0, typeorm_1.InjectRepository)(client_meal_assignment_entity_1.ClientMealAssignment)),
    __param(10, (0, typeorm_1.InjectRepository)(client_diet_assignment_entity_1.ClientDietAssignment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CoachService);
//# sourceMappingURL=coach.service.js.map