import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRecipe, deleteRecipe, findRecipe, getRecipes, updateRecipe } from 'services/recipeService';
import { useCreateRecipe, useDeleteRecipe, useFindRecipe, useListRecipes, useUpdateRecipe } from 'hooks/recipes';
import { FC, ReactNode } from 'react';
import Factory from 'tests/Factory';
import { RequestParamsTypeCreateRecipe, RequestParamsTypeUpdateRecipe } from '../../types/api';

jest.mock('services/recipeService');

const queryClient = new QueryClient();

const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockedGetRecipe = getRecipes as jest.MockedFunction<typeof getRecipes>;
const mockedFindRecipe = findRecipe as jest.MockedFunction<typeof findRecipe>;
const mockedUpdateRecipe = updateRecipe as jest.MockedFunction<typeof updateRecipe>;
const mockedCreateRecipe = createRecipe as jest.MockedFunction<typeof createRecipe>;
const mockedDeleteRecipe = deleteRecipe as jest.MockedFunction<typeof deleteRecipe>;
const mockInvalidateQueries = jest.spyOn(queryClient, 'invalidateQueries');

describe('Recipes Hooks', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('useListRecipes', () => {
        it('fetches recipes successfully', async () => {
            const recipes = Factory.Recipes.createRecipesList(2);

            mockedGetRecipe.mockResolvedValue(recipes);
            const { result } = renderHook(() => useListRecipes(), { wrapper });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(recipes);
            expect(mockedGetRecipe).toHaveBeenCalledTimes(1);
        });
    });

    describe('useFindRecipe', () => {
        it('finds recipes successfully', async () => {
            const recipe = Factory.Recipes.createRecipe();
            mockedFindRecipe.mockResolvedValue(recipe);

            const { result } = renderHook(() => useFindRecipe(recipe.id), { wrapper });

            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(result.current.data).toEqual(recipe);
            expect(mockedFindRecipe).toHaveBeenCalledTimes(1);
        });
    });

    describe('useUpdateRecipe', () => {
        it('finds recipes successfully', async () => {
            const recipe = Factory.Recipes.createRecipe();
            const name = Factory.Helper.generateString();

            const recipeParams = { name } as RequestParamsTypeUpdateRecipe;
            mockedUpdateRecipe.mockResolvedValue(recipe);

            const { result } = renderHook(() => useUpdateRecipe(), { wrapper });

            result.current.mutate({ recipeId: recipe.id, recipeParams });
            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(mockedUpdateRecipe).toHaveBeenCalledWith({ recipeId: recipe.id, recipeParams });
            expect(mockedUpdateRecipe).toHaveBeenCalledTimes(1);
            expect(result.current.data).toEqual(recipe);
            expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ['recipes'] });
        });
    });

    describe('useCreateRecipe', () => {
        it('creates recipes successfully', async () => {
            const recipe = Factory.Recipes.createRecipe();

            const recipeParams = {
                name: recipe.name,
                author_id: recipe.author_id,
                ingredients: recipe.ingredients,
            } as RequestParamsTypeCreateRecipe;

            mockedCreateRecipe.mockResolvedValue(recipe);

            const { result } = renderHook(() => useCreateRecipe(), { wrapper });

            result.current.mutate(recipeParams as RequestParamsTypeCreateRecipe);
            await waitFor(() => expect(result.current.isSuccess).toBe(true));

            expect(mockedCreateRecipe).toHaveBeenCalledWith(recipeParams);
            expect(mockedCreateRecipe).toHaveBeenCalledTimes(1);
            expect(result.current.data).toEqual(recipe);
            expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ['recipes'] });
        });
    });

    describe('useDeleteRecipe', () => {
        it('deletes a recipe succesfully', async () => {
            const recipe = Factory.Recipes.createRecipe();
            mockedDeleteRecipe.mockResolvedValue();

            const { result } = renderHook(() => useDeleteRecipe(), { wrapper });

            result.current.mutate(recipe.id);
            await waitFor(() => {
                expect(result.current.isSuccess).toBe(true);
            });
            expect(mockedDeleteRecipe).toHaveBeenCalledTimes(1);
            expect(mockedDeleteRecipe).toHaveBeenCalledWith(recipe.id);
            expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ['recipes'] });
        });
    });
});
