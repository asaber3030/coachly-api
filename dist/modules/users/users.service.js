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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const user_entity_1 = require("../../common/entities/user.entity");
const user_profile_entity_1 = require("../../common/entities/user-profile.entity");
let UsersService = class UsersService {
    constructor(usersRepository, profilesRepository, coachClientsRepository) {
        this.usersRepository = usersRepository;
        this.profilesRepository = profilesRepository;
        this.coachClientsRepository = coachClientsRepository;
    }
    async getMe(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['profile'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async updateMe(userId, dto) {
        const user = await this.getMe(userId);
        Object.assign(user, {
            firstName: dto.firstName ?? user.firstName,
            lastName: dto.lastName ?? user.lastName,
        });
        return this.usersRepository.save(user);
    }
    async getProfile(userId) {
        const user = await this.getMe(userId);
        if (!user.profile) {
            const profile = this.profilesRepository.create({ user });
            return this.profilesRepository.save(profile);
        }
        return user.profile;
    }
    async updateProfile(userId, dto) {
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
    async getCoach(userId) {
        const coachingLink = await this.coachClientsRepository.findOne({
            where: { client: { id: userId }, isActive: true },
            relations: ['coach', 'coach.profile'],
        });
        return coachingLink?.coach ?? null;
    }
    async getClients(userId) {
        const links = await this.coachClientsRepository.find({
            where: { coach: { id: userId }, isActive: true },
            relations: ['client', 'client.profile'],
            order: { startedAt: 'DESC' },
        });
        return links.map((link) => link.client);
    }
    async getUserById(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
            relations: ['profile'],
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __param(2, (0, typeorm_1.InjectRepository)(coach_client_entity_1.CoachClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map