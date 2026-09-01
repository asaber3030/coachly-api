import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '@app/common/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { UserRoleEnum } from '@app/common/enums/user.enum';
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly configService;
    constructor(usersRepository: Repository<User>, jwtService: JwtService, configService: ConfigService);
    register(dto: RegisterDto): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: UserRoleEnum;
        };
        accessToken: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: UserRoleEnum;
        };
        accessToken: string;
    }>;
    me(userId: string): Promise<void>;
    private generateTokens;
}
