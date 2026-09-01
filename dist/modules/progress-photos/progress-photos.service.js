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
exports.ProgressPhotosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const progress_photo_entity_1 = require("../../common/entities/progress-photo.entity");
const user_entity_1 = require("../../common/entities/user.entity");
let ProgressPhotosService = class ProgressPhotosService {
    constructor(photosRepository, userRepository, coachClientRepository) {
        this.photosRepository = photosRepository;
        this.userRepository = userRepository;
        this.coachClientRepository = coachClientRepository;
    }
    async findByUser(userId) {
        return this.photosRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
        });
    }
    async findOneByUser(userId, photoId) {
        const photo = await this.photosRepository.findOne({
            where: { id: photoId, user: { id: userId } },
            relations: ['user'],
        });
        if (!photo) {
            throw new common_1.NotFoundException('Progress photo not found');
        }
        return photo;
    }
    async createForUser(userId, dto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const photo = this.photosRepository.create({
            user,
            imageUrl: dto.imageUrl,
            description: dto.description,
        });
        return this.photosRepository.save(photo);
    }
    async updateForUser(userId, photoId, dto) {
        const photo = await this.findOneByUser(userId, photoId);
        Object.assign(photo, {
            imageUrl: dto.imageUrl ?? photo.imageUrl,
            description: dto.description ?? photo.description,
        });
        return this.photosRepository.save(photo);
    }
    async removeForUser(userId, photoId) {
        const photo = await this.findOneByUser(userId, photoId);
        await this.photosRepository.remove(photo);
        return { deleted: true };
    }
    async findByClient(coachId, clientId) {
        const relation = await this.coachClientRepository.findOne({
            where: { coach: { id: coachId }, client: { id: clientId }, isActive: true },
            relations: ['coach', 'client'],
        });
        if (!relation) {
            throw new common_1.NotFoundException('This client is not assigned to your domain');
        }
        return this.photosRepository.find({
            where: { user: { id: clientId } },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.ProgressPhotosService = ProgressPhotosService;
exports.ProgressPhotosService = ProgressPhotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(progress_photo_entity_1.ProgressPhoto)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(coach_client_entity_1.CoachClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProgressPhotosService);
//# sourceMappingURL=progress-photos.service.js.map