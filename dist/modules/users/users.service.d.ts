import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto, PaginatedResult } from '../../common/dto/pagination.dto';
import { User } from '@app/common/entities/user.entity';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(dto: CreateUserDto): Promise<User>;
    findAll(pagination: PaginationDto): Promise<PaginatedResult<User>>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    update(id: string, dto: UpdateUserDto): Promise<User>;
    remove(id: string): Promise<void>;
}
