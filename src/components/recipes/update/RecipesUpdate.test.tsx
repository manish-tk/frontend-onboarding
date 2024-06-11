import { UseMutationResult } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useUpdateRecipe } from 'hooks/recipes';
import Factory from 'tests/Factory';
import RecipesUpdate from './RecipesUpdate';
import { RequestParamsTypeUpdateRecipe } from 'types/api';
import { Recipe } from 'types/resources';

jest.mock('hooks/recipes', () => ({
    useUpdateRecipe: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
jest.mock('components/recipes/delete/RecipesDelete', () => {
    return jest.fn(() => <div>Mocked RecipesDelete Component</div>);
});

const mockedUseUpdateRecipe = useUpdateRecipe as jest.MockedFunction<typeof useUpdateRecipe>;

describe('RecipesUpdate Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedUseUpdateRecipe.mockReturnValue({
            mutate: jest.fn((params, options) => {
                if (options?.onSuccess) {
                    options.onSuccess();
                }
            }),
        } as unknown as UseMutationResult<
            Recipe,
            Error,
            { recipeId: string; recipeParams: RequestParamsTypeUpdateRecipe },
            unknown
        >);
    });

    it('renders form elements correctly', () => {
        const recipe = Factory.Recipes.createRecipe();

        render(
            <BrowserRouter>
                <RecipesUpdate recipe={recipe} />
            </BrowserRouter>,
        );

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Author')).toBeInTheDocument();
        expect(screen.getByLabelText('Ingredients')).toBeInTheDocument();
    });

    it('handles button submission correctly', async () => {
        const recipe = Factory.Recipes.createRecipe();

        render(
            <BrowserRouter>
                <RecipesUpdate recipe={recipe} />
            </BrowserRouter>,
        );

        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'New Name' } });
        fireEvent.change(screen.getByLabelText('Author'), { target: { value: 'New Author' } });
        fireEvent.change(screen.getByLabelText('Ingredients'), { target: { value: 'New Ingredients' } });

        fireEvent.click(screen.getByText('Update Recipe'));

        expect(mockedUseUpdateRecipe).toHaveBeenCalled();
        expect(mockedUseUpdateRecipe).toHaveBeenCalledWith();

        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/recipes');
    });
});
