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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../../common/entities/user.entity");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_2 = require("typeorm");
const user_enum_1 = require("../../common/enums/user.enum");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService, configService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(dto) {
        const email = dto.email.toLowerCase();
        const existingUser = await this.usersRepository.findOne({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email is already registered');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 12);
        const user = this.usersRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            email,
            password: hashedPassword,
            role: user_enum_1.UserRoleEnum.USER,
        });
        const savedUser = await this.usersRepository.save(user);
        return this.generateTokens(savedUser);
    }
    async login(dto) {
        const email = dto.email.toLowerCase();
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', {
            email,
        })
            .getOne();
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        if (!user.isActive) {
            throw new common_1.UnauthorizedException('This account is inactive');
        }
        const passwordMatches = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        return this.generateTokens(user);
    }
    async me(userId) {
        const user = await this.usersRepository.findOne({
            where: { id: userId },
        });
    }
    async generateTokens(user) {
        const payload = {
            id: user.id,
            sub: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.getOrThrow('jwt.accessSecret'),
            expiresIn: this.configService.get('jwt.accessExpiresIn') ?? '15m',
        });
        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
            accessToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map