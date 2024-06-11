import React, { act } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { useCreateRecipe } from 'hooks/recipes';
import RecipesCreate from './RecipesCreate';
import Factory from 'tests/Factory';
import { UseMutationResult } from '@tanstack/react-query';
import { Recipe } from 'types/resources';
import { RequestParamsTypeCreateRecipe } from 'types/api';

jest.mock('hooks/recipes', () => ({
    useCreateRecipe: jest.fn(),
}));

const mockedUseCreateRecipe = useCreateRecipe as jest.MockedFunction<typeof useCreateRecipe>;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('RecipesCreate Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedUseCreateRecipe.mockReturnValue({
            mutate: jest.fn((params, options) => {
                if (options?.onSuccess) {
                    options.onSuccess();
                }
            }),
        } as unknown as UseMutationResult<Recipe, Error, RequestParamsTypeCreateRecipe, unknown>);
    });

    it('renders form elements correctly', () => {
        render(
            <BrowserRouter>
                <RecipesCreate />
            </BrowserRouter>,
        );

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Author')).toBeInTheDocument();
        expect(screen.getByLabelText('Ingredients')).toBeInTheDocument();
        expect(screen.getByText('Create Recipe')).toBeInTheDocument();
    });

    it('handles form submission correctly', async () => {
        const component = render(
            <BrowserRouter>
                <RecipesCreate />
            </BrowserRouter>,
        );

        const recipe = Factory.Recipes.createRecipe();

        const { container } = component;
        const nameField = container.querySelector('input[name="name"]');
        const authorField = container.querySelector('input[name="author_id"]');
        const ingredientsField = container.querySelector('input[name="ingredients"]');
        const submitButton = container.querySelector('button[type="submit"]');
        expect(nameField).toBeInTheDocument();
        expect(authorField).toBeInTheDocument();
        expect(ingredientsField).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(nameField!, { target: { value: recipe.name } });
            fireEvent.change(authorField!, { target: { value: recipe.author_id } });
            fireEvent.change(ingredientsField!, { target: { value: recipe.ingredients.join(',') } });
        });

        await act(async () => {
            fireEvent.click(screen.getByText('Create Recipe'));
        });

        expect(mockedUseCreateRecipe().mutate).toHaveBeenCalledWith(
            {
                name: recipe.name,
                author_id: recipe.author_id,
                ingredients: recipe.ingredients,
            },
            { onSuccess: expect.any(Function) },
        );

        expect(mockNavigate).toHaveBeenCalledWith('/recipes');
    });
});
