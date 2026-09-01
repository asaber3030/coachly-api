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
exports.WorkoutsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const excersie_entity_1 = require("../../common/entities/excersie.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const workout_entity_1 = require("../../common/entities/workout.entity");
const workout_excecies_entity_1 = require("../../common/entities/workout-excecies.entity");
let WorkoutsService = class WorkoutsService {
    constructor(workoutsRepository, workoutExercisesRepository, exercisesRepository, usersRepository) {
        this.workoutsRepository = workoutsRepository;
        this.workoutExercisesRepository = workoutExercisesRepository;
        this.exercisesRepository = exercisesRepository;
        this.usersRepository = usersRepository;
    }
    async findAllByCoach(userId, limit, offset) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        return this.workoutsRepository.find({
            where: [{ createdBy: { id: userId } }, { isGlobal: true }],
            relations: ['createdBy', 'group', 'exercises', 'exercises.exercise'],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async findOneForCoach(userId, workoutId) {
        const workout = await this.workoutsRepository.findOne({
            where: [
                { id: workoutId, createdBy: { id: userId } },
                { id: workoutId, isGlobal: true },
            ],
            relations: ['createdBy', 'group', 'exercises', 'exercises.exercise'],
        });
        if (!workout) {
            throw new common_1.NotFoundException('Workout not found');
        }
        return workout;
    }
    async createForCoach(userId, dto) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
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
            const exercises = await this.exercisesRepository.findBy({ id: (0, typeorm_2.In)(exerciseIds) });
            if (exercises.length !== exerciseIds.length) {
                throw new common_1.NotFoundException('One or more exercises were not found');
            }
            const items = dto.exercises.map((item) => {
                const exercise = exercises.find((entry) => entry.id === item.exerciseId);
                return this.workoutExercisesRepository.create({
                    workout: savedWorkout,
                    exercise: exercise,
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
    async updateForCoach(userId, workoutId, dto) {
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
            await this.workoutExercisesRepository.delete({ workout: { id: workout.id } });
            if (dto.exercises.length > 0) {
                const exercises = await this.exercisesRepository.findBy({
                    id: (0, typeorm_2.In)(dto.exercises.map((item) => item.exerciseId)),
                });
                if (exercises.length !== dto.exercises.length) {
                    throw new common_1.NotFoundException('One or more exercises were not found');
                }
                const nextItems = dto.exercises.map((item) => {
                    const exercise = exercises.find((entry) => entry.id === item.exerciseId);
                    return this.workoutExercisesRepository.create({
                        workout: savedWorkout,
                        exercise: exercise,
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
    async removeForCoach(userId, workoutId) {
        const workout = await this.findOneForCoach(userId, workoutId);
        await this.workoutsRepository.remove(workout);
        return { deleted: true };
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workout_entity_1.Workout)),
    __param(1, (0, typeorm_1.InjectRepository)(workout_excecies_entity_1.WorkoutExercise)),
    __param(2, (0, typeorm_1.InjectRepository)(excersie_entity_1.Exercise)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map