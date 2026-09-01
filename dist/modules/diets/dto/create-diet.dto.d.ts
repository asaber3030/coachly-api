export declare class DietMealItemDto {
    mealId: string;
    dayOfWeek: number;
    mealTime: string;
}
export declare class CreateDietDto {
    name: string;
    description?: string;
    isGlobal?: boolean;
    items?: DietMealItemDto[];
}
