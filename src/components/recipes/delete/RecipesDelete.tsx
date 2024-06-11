import { Recipe } from 'types/resources';
import React, { FC } from 'react';
import { useDeleteRecipe } from 'hooks/recipes';
import { Button } from 'styled/UIComponents';
import { useNavigate } from 'react-router-dom';

type RecipesDeleteProps = {
    recipe: Recipe;
};

const RecipesDelete: FC<RecipesDeleteProps> = ({ recipe }) => {
    const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe();
    const navigate = useNavigate();

    const handleDelete = async () => {
        deleteRecipe(recipe.id, {
            onSuccess: () => {
                navigate('/recipes');
            },
        });
    };

    if (isDeleting) return <div>Deleting...</div>;

    return (
        <div>
            <div className="flex justify-center">
                <Button variant="danger" onClick={handleDelete}>
                    {isDeleting ? 'Updating...' : 'Delete Recipe'}
                </Button>
            </div>
        </div>
    );
};

export default RecipesDelete;
