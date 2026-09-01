export declare class DietMealItemUpdateDto {
    mealId?: string;
    dayOfWeek?: number;
    mealTime?: string;
}
export declare class UpdateDietDto {
    name?: string;
    description?: string;
    isGlobal?: boolean;
    items?: DietMealItemUpdateDto[];
}
