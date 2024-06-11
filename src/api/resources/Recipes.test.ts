import Recipes from './Recipes';
import { AxiosResponse } from 'axios';
import Factory from '../../tests/Factory';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { RequestParamsTypeCreateRecipe, RequestParamsTypeUpdateRecipe, ResponseTypeRecipesList } from 'types/api';

jest.mock('axios');

// Mock the base resource for axios instance
jest.mock('./Base', () => {
    return {
        __esModule: true,
        default: class {
            protected axios: AxiosInstance;

            constructor() {
                this.axios = mockedAxios;
            }
        },
    };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Recipes', () => {
    let recipes: Recipes;

    beforeEach(() => {
        recipes = new Recipes();
    });

    it('should fetch a recipe by ID', async () => {
        const recipe = Factory.Recipes.createRecipe();
        const mockResponse = { data: recipe };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const response = await recipes.find(recipe.id);

        expect(mockedAxios.get).toHaveBeenCalledWith(`/recipes/api/${recipe.id}`);
        expect(response).toEqual(mockResponse);
    });

    it('should fetch all recipes', async () => {
        const recipesList = Factory.Recipes.createRecipesList();

        const mockResponse: AxiosResponse<ResponseTypeRecipesList> = {
            data: { recipes: recipesList },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {} as InternalAxiosRequestConfig,
        };
        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const response = await recipes.get();

        expect(mockedAxios.get).toHaveBeenCalledWith('/recipes/api');
        expect(response).toEqual(mockResponse);
    });

    it('should create a recipe', async () => {
        const recipe = Factory.Recipes.createRecipe();
        const newRecipe: RequestParamsTypeCreateRecipe = {
            name: recipe.name,
            author_id: recipe.author_id,
            ingredients: recipe.ingredients,
        };

        const mockResponse = { data: recipe };
        mockedAxios.post.mockResolvedValueOnce(mockResponse);

        const response = await recipes.create(newRecipe);

        expect(mockedAxios.post).toHaveBeenCalledWith('/recipes/api/', newRecipe);
        expect(response).toEqual(mockResponse);
    });

    it('should update a recipe', async () => {
        const recipe = Factory.Recipes.createRecipe();
        const updatedRecipe: RequestParamsTypeUpdateRecipe = {
            name: recipe.name,
            author_id: recipe.author_id,
            ingredients: recipe.ingredients,
        };

        const mockResponse = { data: recipe };
        mockedAxios.patch.mockResolvedValueOnce(mockResponse);

        const response = await recipes.update(recipe.id, updatedRecipe);

        expect(mockedAxios.patch).toHaveBeenCalledWith(`/recipes/api/${recipe.id}`, updatedRecipe);
        expect(response).toEqual(mockResponse);
    });

    it('should delete a recipe', async () => {
        const recipe = Factory.Recipes.createRecipe();
        const mockResponse = { data: {} };
        mockedAxios.delete.mockResolvedValueOnce(mockResponse);

        const response = await recipes.delete(recipe.id);

        expect(mockedAxios.delete).toHaveBeenCalledWith(`/recipes/api/${recipe.id}`);
        expect(response).toEqual(mockResponse);
    });
});
