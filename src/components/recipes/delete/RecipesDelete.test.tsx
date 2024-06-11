import { UseMutationResult } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { useDeleteRecipe } from 'hooks/recipes';
import RecipesDelete from './RecipesDelete';
import Factory from 'tests/Factory';

jest.mock('hooks/recipes', () => ({
    useDeleteRecipe: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));
const mockedUseDeleteRecipe = useDeleteRecipe as jest.MockedFunction<typeof useDeleteRecipe>;

describe('RecipesDelete Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedUseDeleteRecipe.mockReturnValue({
            mutate: jest.fn((recipeId, options) => {
                if (options?.onSuccess) {
                    options.onSuccess();
                }
            }),
        } as unknown as UseMutationResult<void, Error, string, unknown>);
    });

    it('renders form elements correctly', () => {
        const recipe = Factory.Recipes.createRecipe();

        render(
            <BrowserRouter>
                <RecipesDelete recipe={recipe} />
            </BrowserRouter>,
        );

        expect(screen.getByText('Delete Recipe')).toBeInTheDocument();
    });

    it('handles button submission correctly', async () => {
        const recipe = Factory.Recipes.createRecipe();

        render(
            <BrowserRouter>
                <RecipesDelete recipe={recipe} />
            </BrowserRouter>,
        );

        const button = screen.getByText('Delete Recipe');
        fireEvent.click(button);

        expect(mockedUseDeleteRecipe).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/recipes');
    });
});
