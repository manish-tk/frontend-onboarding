import React from 'react';
import { useState } from 'react';
import { FormEvent, FC } from 'react';
import { useCreateRecipe } from 'hooks/recipes';
import { RequestParamsTypeCreateRecipe } from 'types/api';
import StringsHelper from 'helpers/StringsHelper';
import { Button, Card, Container, Input } from 'styled/UIComponents';
import { useNavigate } from 'react-router-dom';

const useHandleSubmit = (params: RequestParamsTypeCreateRecipe) => {
    const createRecipe = useCreateRecipe();
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createRecipe.mutate(params, {
            onSuccess: () => {
                navigate('/recipes');
                return;
            },
        });
    };

    return [handleSubmit] as const;
};

const RecipesCreate: FC = () => {
    const [name, setName] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [ingredients, setIngredients] = useState('');

    const ingredientsList = StringsHelper.split(ingredients);
    const params: RequestParamsTypeCreateRecipe = {
        name,
        author_id: authorId,
        ingredients: ingredientsList,
    };
    const [handleSubmit] = useHandleSubmit(params);

    return (
        <Container>
            <Card>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                            value={authorId}
                            onChange={(e) => setAuthorId(e.target.value)}
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

                    <div className="flex justify-center m-4">
                        <Button variant="primary" type="submit">
                            Create Recipe
                        </Button>
                    </div>
                </form>
            </Card>
        </Container>
    );
};

export default RecipesCreate;
