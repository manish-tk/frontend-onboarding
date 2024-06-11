import React from 'react';
import RecipesCreate from 'components/recipes/create/RecipesCreate';

const RecipesListPage: React.FC = () => {
    return (
        <div>
            <h1 className="m-4">Create a recipes</h1>
            <RecipesCreate />
        </div>
    );
};

export default RecipesListPage;
