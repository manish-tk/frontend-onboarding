import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createRecipe, deleteRecipe, findRecipe, getRecipes, updateRecipe } from '../../services/recipeService';

export const useListRecipes = () => {
    return useQuery({
        queryKey: ['recipes'],
        queryFn: getRecipes,
    });
};

export const useFindRecipe = (recipeId?: string) => {
    if (!recipeId) {
        throw new Error('recipe id is incorrect');
    }

    return useQuery({
        queryKey: ['recipe', recipeId],
        queryFn: () => findRecipe(recipeId),
    });
};

export const useCreateRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipes'] });
        },
    });
};

export const useUpdateRecipe = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipes'] });
        },
    });
};

export const useDeleteRecipe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteRecipe,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['recipes'] });
        },
    });
};
