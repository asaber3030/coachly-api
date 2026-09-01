export declare class MealRecipeItemUpdateDto {
    recipeId?: string;
}
export declare class UpdateMealDto {
    name?: string;
    isGlobal?: boolean;
    recipes?: MealRecipeItemUpdateDto[];
}
