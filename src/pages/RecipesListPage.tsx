import React from 'react';
import RecipesList from 'components/recipes/list/RecipesList';

const RecipesListPage: React.FC = () => {
    return (
        <div className="flex flex-col justify-center gap-4">
            <div className="m-4">
                <RecipesList />
            </div>
        </div>
    );
};

export default RecipesListPage;
