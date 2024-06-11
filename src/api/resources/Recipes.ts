import BaseResource from './Base';
import { RequestParamsTypeCreateRecipe, RequestParamsTypeUpdateRecipe, ResponseTypeRecipesList } from 'types/api';
import { AxiosResponse } from 'axios';

export default class Recipes extends BaseResource {
    private resourceUrl: string = '/recipes/api';

    async find(recipeId: string): Promise<AxiosResponse> {
        return this.axios.get(`${this.resourceUrl}/${recipeId}`);
    }

    async get(): Promise<AxiosResponse> {
        return this.axios.get<ResponseTypeRecipesList>(this.resourceUrl);
    }

    async create(recipe: RequestParamsTypeCreateRecipe): Promise<AxiosResponse> {
        return this.axios.post(`${this.resourceUrl}/`, recipe);
    }

    async update(recipeId: string, recipe: RequestParamsTypeUpdateRecipe): Promise<AxiosResponse> {
        return this.axios.patch(`${this.resourceUrl}/${recipeId}`, recipe);
    }

    async delete(recipeId: string): Promise<AxiosResponse> {
        return this.axios.delete(`${this.resourceUrl}/${recipeId}`);
    }
}
