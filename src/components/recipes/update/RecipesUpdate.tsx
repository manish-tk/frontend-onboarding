import React, { FC, useEffect, useState } from 'react';
import { useUpdateRecipe } from 'hooks/recipes';
import StringsHelper from 'helpers/StringsHelper';
import { RequestParamsTypeUpdateRecipe } from 'types/api';
import { Recipe } from 'types/resources';
import RecipesDelete from 'components/recipes/delete/RecipesDelete';
import { Container, Card, Input, Button } from 'styled/UIComponents';
import { useNavigate } from 'react-router-dom';

type RecipesUpdateProps = {
    recipe: Recipe;
};

const RecipesUpdate: FC<RecipesUpdateProps> = ({ recipe }) => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [ingredients, setIngredients] = useState('');

    const { mutate: updateRecipe, isPending: isUpdating, isError: isUpdateError } = useUpdateRecipe();
    const navigate = useNavigate();

    useEffect(() => {
        if (recipe) {
            setName(recipe.name);
            setAuthor(recipe.author_id);
            setIngredients(recipe.ingredients.join(', '));
        }
    }, [recipe]);

    const handleUpdate = () => {
        const updatedIngredients = StringsHelper.split(ingredients);
        const recipeParams: RequestParamsTypeUpdateRecipe = {
            name,
            author_id: author,
            ingredients: updatedIngredients,
        };
        updateRecipe(
            { recipeId: recipe.id, recipeParams },
            {
                onSuccess: () => {
                    navigate('/recipes');
                },
            },
        );
    };

    if (isUpdateError) {
        return <div>Error: updating recipe</div>;
    }

    return (
        <Container>
            <Card>
                <div className="flex flex-col gap-4 m-4">
                    <div className="flex justify-center items-center gap-2">
                        <label className="w-1/6" htmlFor="name">
                            Name
                        </label>
                        <Input
                            className="flex-1"
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <label className="w-1/6" htmlFor="author_id">
                            Author
                        </label>
                        <Input
                            className="flex-1"
                            type="text"
                            name="author_id"
                            id="author_id"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <label className="w-1/6" htmlFor="ingredients">
                            Ingredients
                        </label>
                        <Input
                            type="text"
                            className="flex-1"
                            name="ingredients"
                            id="ingredients"
                            value={ingredients}
                            onChange={(e) => setIngredients(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex justify-center">
                    <Button variant="primary" onClick={handleUpdate}>
                        {isUpdating ? 'Updating...' : 'Update Recipe'}
                    </Button>
                </div>

                <RecipesDelete recipe={recipe} />
            </Card>
        </Container>
    );
};

export default RecipesUpdate;
