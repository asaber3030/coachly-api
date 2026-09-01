import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginBody: LoginDto): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../../common/enums/user.enum").UserRoleEnum;
        };
        accessToken: string;
    }>;
    register(registerBody: RegisterDto): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import("../../common/enums/user.enum").UserRoleEnum;
        };
        accessToken: string;
    }>;
    getMe(userId: string): Promise<void>;
}
