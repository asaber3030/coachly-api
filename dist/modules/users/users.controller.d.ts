import { AuthenticatedUser } from '@app/common/interfaces/authenticated-user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: AuthenticatedUser): Promise<import("../../common/entities/user.entity").User>;
    updateMe(user: AuthenticatedUser, dto: UpdateUserDto): Promise<import("../../common/entities/user.entity").User>;
    getProfile(user: AuthenticatedUser): Promise<import("../../common/entities/user-profile.entity").UserProfile>;
    updateProfile(user: AuthenticatedUser, dto: UpdateUserProfileDto): Promise<import("../../common/entities/user-profile.entity").UserProfile>;
    getCoach(user: AuthenticatedUser): Promise<import("../../common/entities/user.entity").User | null>;
    getClients(user: AuthenticatedUser): Promise<import("../../common/entities/user.entity").User[]>;
    getUserById(id: string): Promise<import("../../common/entities/user.entity").User>;
}
