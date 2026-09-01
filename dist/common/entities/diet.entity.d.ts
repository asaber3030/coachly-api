import { User } from './user.entity';
import { DietItem } from './diet-item.entity';
import { BaseEntity } from './base.entity';
export declare class Diet extends BaseEntity {
    name: string;
    description?: string;
    isGlobal: boolean;
    user?: User;
    createdBy?: User;
    items: DietItem[];
}
