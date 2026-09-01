export declare class MealRecipeItemDto {
    recipeId: string;
}
export declare class CreateMealDto {
    name: string;
    isGlobal?: boolean;
    recipes?: MealRecipeItemDto[];
}
