import { BaseEntity } from './base.entity';
export declare class Admin extends BaseEntity {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
}
