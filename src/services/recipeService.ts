import { Recipe } from 'types/resources';
import Recipes from 'api/resources/Recipes';
import { RequestParamsTypeCreateRecipe, RequestParamsTypeUpdateRecipe } from 'types/api';

export const findRecipe = async (recipeId: string): Promise<Recipe> => {
    const { data } = await new Recipes().find(recipeId);
    return data;
};

export const getRecipes = async (): Promise<Recipe[]> => {
    const { data } = await new Recipes().get();
    return data.recipes;
};

export const createRecipe = async (recipeParams: RequestParamsTypeCreateRecipe): Promise<Recipe> => {
    const { data } = await new Recipes().create(recipeParams);
    return data;
};

export const updateRecipe = async ({
    recipeId,
    recipeParams,
}: {
    recipeId: string;
    recipeParams: RequestParamsTypeUpdateRecipe;
}): Promise<Recipe> => {
    const { data } = await new Recipes().update(recipeId, recipeParams);
    return data;
};

export const deleteRecipe = async (recipeId: string): Promise<void> => {
    await new Recipes().delete(recipeId);
};
