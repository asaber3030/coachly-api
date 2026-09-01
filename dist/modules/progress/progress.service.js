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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const progress_entity_1 = require("../../common/entities/progress.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
let ProgressService = class ProgressService {
    constructor(progressRepository, usersRepository, coachClientsRepository) {
        this.progressRepository = progressRepository;
        this.usersRepository = usersRepository;
        this.coachClientsRepository = coachClientsRepository;
    }
    async findByUser(userId, limit, offset) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return this.progressRepository.find({
            where: { user: { id: userId } },
            order: { date: 'DESC' },
            take: limit,
            skip: offset,
        });
    }
    async findOneByUser(userId, progressId) {
        const progress = await this.progressRepository.findOne({
            where: { id: progressId, user: { id: userId } },
            relations: ['user'],
        });
        if (!progress) {
            throw new common_1.NotFoundException('Progress entry not found');
        }
        return progress;
    }
    async createForUser(userId, dto) {
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
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
    async updateForUser(userId, progressId, dto) {
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
    async removeForUser(userId, progressId) {
        const entry = await this.findOneByUser(userId, progressId);
        await this.progressRepository.remove(entry);
        return { deleted: true };
    }
    async findByClient(userId, clientId) {
        const coachClient = await this.coachClientsRepository.findOne({
            where: { coach: { id: userId }, client: { id: clientId }, isActive: true },
            relations: ['coach', 'client'],
        });
        if (!coachClient) {
            throw new common_1.NotFoundException('This client is not assigned to your domain');
        }
        return this.progressRepository.find({
            where: { user: { id: clientId } },
            relations: ['user'],
            order: { date: 'DESC' },
        });
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(progress_entity_1.Progress)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(coach_client_entity_1.CoachClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map