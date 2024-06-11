import { useListRecipes } from 'hooks/recipes';
import React from 'react';
import { Link } from 'react-router-dom';

const RecipesList: React.FC = () => {
    const { data: recipes, isLoading, isError, error } = useListRecipes();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message}</div>;
    }

    return (
        <div>
            <h3 className="m-4">Recipes List</h3>
            <div className="flex flex-col items-center gap-4">
                {recipes?.map((recipe) => (
                    <div className="list-item" key={recipe.id}>
                        <Link className="link" to={`/recipes/${recipe.id}`}>
                            {recipe.name}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipesList;
