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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const excersie_entity_1 = require("../../common/entities/excersie.entity");
const user_entity_1 = require("../../common/entities/user.entity");
let ExercisesService = class ExercisesService {
    constructor(exercisesRepository, usersRepository) {
        this.exercisesRepository = exercisesRepository;
        this.usersRepository = usersRepository;
    }
    async findAllForCoach(userId, limit, offset) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
        }
        return this.exercisesRepository.find({
            where: [{ createdBy: { id: userId } }, { isGlobal: true }],
            relations: ['createdBy', 'group'],
            order: { createdAt: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async findOneForCoach(userId, exerciseId) {
        const exercise = await this.exercisesRepository.findOne({
            where: [
                { id: exerciseId, createdBy: { id: userId } },
                { id: exerciseId, isGlobal: true },
            ],
            relations: ['createdBy', 'group'],
        });
        if (!exercise) {
            throw new common_1.NotFoundException('Exercise not found');
        }
        return exercise;
    }
    async createForCoach(userId, dto) {
        const coach = await this.usersRepository.findOne({ where: { id: userId } });
        if (!coach) {
            throw new common_1.NotFoundException('Coach not found');
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
    async updateForCoach(userId, exerciseId, dto) {
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
    async removeForCoach(userId, exerciseId) {
        const exercise = await this.findOneForCoach(userId, exerciseId);
        await this.exercisesRepository.remove(exercise);
        return { deleted: true };
    }
};
exports.ExercisesService = ExercisesService;
exports.ExercisesService = ExercisesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(excersie_entity_1.Exercise)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ExercisesService);
//# sourceMappingURL=exercises.service.js.map