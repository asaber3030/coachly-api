import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/common/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from '@app/common/interfaces/jwt-payload.interface';
import { UserRoleEnum } from '@app/common/enums/user.enum';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.toLowerCase();

    const existingUser = await this.usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 12);

    const user = this.usersRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email,
      password: hashedPassword,

      role: UserRoleEnum.USER,
    });

    const savedUser = await this.usersRepository.save(user);

    return this.generateTokens(savedUser);
  }

  async login(dto: LoginDto) {
    const email = dto.email.toLowerCase();

    // password has select: false
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', {
        email,
      })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('This account is inactive');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateTokens(user);
  }

  async me(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
  }

  private async generateTokens(user: User) {
    const payload: JwtPayload = {
      id: user.id,
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('jwt.accessSecret'),
      expiresIn: this.configService.get<string>('jwt.accessExpiresIn') ?? '15m',
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
}
