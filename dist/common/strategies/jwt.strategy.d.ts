import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        role: import("../enums/user.enum").UserRoleEnum;
    }>;
}
export {};
