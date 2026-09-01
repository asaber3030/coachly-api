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
exports.BodyMeasurementsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const body_measurement_entity_1 = require("../../common/entities/body-measurement.entity");
const coach_client_entity_1 = require("../../common/entities/coach-client.entity");
const user_entity_1 = require("../../common/entities/user.entity");
let BodyMeasurementsService = class BodyMeasurementsService {
    constructor(bodyMeasurementRepository, userRepository, coachClientRepository) {
        this.bodyMeasurementRepository = bodyMeasurementRepository;
        this.userRepository = userRepository;
        this.coachClientRepository = coachClientRepository;
    }
    async findByUser(userId) {
        return this.bodyMeasurementRepository.find({
            where: { user: { id: userId } },
            order: { date: 'DESC' },
        });
    }
    async findOneByUser(userId, measurementId) {
        const measurement = await this.bodyMeasurementRepository.findOne({
            where: { id: measurementId, user: { id: userId } },
            relations: ['user'],
        });
        if (!measurement) {
            throw new common_1.NotFoundException('Body measurement not found');
        }
        return measurement;
    }
    async createForUser(userId, dto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
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
    async updateForUser(userId, measurementId, dto) {
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
    async removeForUser(userId, measurementId) {
        const measurement = await this.findOneByUser(userId, measurementId);
        await this.bodyMeasurementRepository.remove(measurement);
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
        return this.bodyMeasurementRepository.find({
            where: { user: { id: clientId } },
            relations: ['user'],
            order: { date: 'DESC' },
        });
    }
};
exports.BodyMeasurementsService = BodyMeasurementsService;
exports.BodyMeasurementsService = BodyMeasurementsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(body_measurement_entity_1.BodyMeasurement)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(coach_client_entity_1.CoachClient)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], BodyMeasurementsService);
//# sourceMappingURL=body-measurements.service.js.map