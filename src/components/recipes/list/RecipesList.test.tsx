import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import { useListRecipes } from 'hooks/recipes';
import RecipesList from './RecipesList';
import { UseQueryResult } from '@tanstack/react-query';
import { Recipe } from 'types/resources';
import Factory from '../../../tests/Factory';

jest.mock('hooks/recipes', () => ({
    useListRecipes: jest.fn(),
}));

const mockedUseListRecipes = useListRecipes as jest.MockedFunction<typeof useListRecipes>;

describe('RecipesList Component', () => {
    it('renders loading state', () => {
        mockedUseListRecipes.mockReturnValue({
            data: undefined,
            isLoading: true,
            isError: false,
            error: null,
        } as UseQueryResult<Recipe[]>);

        render(
            <BrowserRouter>
                <RecipesList />
            </BrowserRouter>,
        );

        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        mockedUseListRecipes.mockReturnValue({
            data: undefined,
            isLoading: false,
            isError: true,
            error: new Error('Error fetching recipes'),
        } as UseQueryResult<Recipe[]>);

        render(
            <BrowserRouter>
                <RecipesList />
            </BrowserRouter>,
        );

        expect(screen.getByText('Error: Error fetching recipes')).toBeInTheDocument();
    });

    it('renders list of recipes', () => {
        const recipes = [Factory.Recipes.createRecipe(), Factory.Recipes.createRecipe()];

        mockedUseListRecipes.mockReturnValue({
            data: recipes,
            isLoading: false,
            isError: false,
            error: null,
        } as UseQueryResult<Recipe[]>);

        render(
            <BrowserRouter>
                <RecipesList />
            </BrowserRouter>,
        );

        expect(screen.getByText('Recipes List')).toBeInTheDocument();
        recipes.forEach((recipe) => {
            expect(screen.getByText(recipe.name)).toBeInTheDocument();
            expect(screen.getByRole('link', { name: recipe.name })).toHaveAttribute('href', `/recipes/${recipe.id}`);
        });
    });
});
