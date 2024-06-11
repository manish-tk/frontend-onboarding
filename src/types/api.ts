import { Recipe } from 'types/resources';

export type ResponseTypeRecipesList = {
    recipes: Recipe[];
};

export type RequestParamsTypeCreateRecipe = {
    name: string;
    author_id: string;
    ingredients: string[];
};

export type RequestParamsTypeUpdateRecipe = {
    name: string | null;
    author_id: string | null;
    ingredients: string[] | null;
};
