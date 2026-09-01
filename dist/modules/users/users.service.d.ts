import { Repository } from 'typeorm';
import { CoachClient } from '@app/common/entities/coach-client.entity';
import { User } from '@app/common/entities/user.entity';
import { UserProfile } from '@app/common/entities/user-profile.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
export declare class UsersService {
    private readonly usersRepository;
    private readonly profilesRepository;
    private readonly coachClientsRepository;
    constructor(usersRepository: Repository<User>, profilesRepository: Repository<UserProfile>, coachClientsRepository: Repository<CoachClient>);
    getMe(userId: string): Promise<User>;
    updateMe(userId: string, dto: UpdateUserDto): Promise<User>;
    getProfile(userId: string): Promise<UserProfile>;
    updateProfile(userId: string, dto: UpdateUserProfileDto): Promise<UserProfile>;
    getCoach(userId: string): Promise<User | null>;
    getClients(userId: string): Promise<User[]>;
    getUserById(userId: string): Promise<User>;
}
