import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { User } from '@app/common/entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(user: User): Promise<User>;
    findAll(pagination: PaginationDto): Promise<import("../../common/dto/pagination.dto").PaginatedResult<User>>;
    findOne(id: string): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
