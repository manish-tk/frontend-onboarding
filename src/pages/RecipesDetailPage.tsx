import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFindRecipe } from '../hooks/recipes';
import RecipesUpdate from '../components/recipes/update/RecipesUpdate';

const RecipesDetailPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const [recipeId] = useState(id || '');

    const { data: recipe, isLoading, isError, error } = useFindRecipe(recipeId);

    if (!id || !recipe) return <div className="p-4">Recipe not found</div>;
    if (isLoading) return <div className="p-4">Loading...</div>;
    if (isError) return <div className="p-4">Error: {error?.message}</div>;

    return (
        <div>
            <div className="flex flex-col m-4">
                <h3>Recipe details</h3>
            </div>

            <h2 className="m-4">{recipe.name}</h2>
            <RecipesUpdate recipe={recipe} />
        </div>
    );
};

export default RecipesDetailPage;
