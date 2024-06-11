import FactoryHelper from './FactoryHelper';
import Ingredients from './Ingredients';
import { Recipe } from 'types/resources';

export default class Recipes {
    static createRecipe(extra: Partial<Recipe> = {}): Recipe {
        const ingredient = Ingredients.createIngredient();

        return {
            id: FactoryHelper.generateId(),
            name: FactoryHelper.generateString(),
            author_id: FactoryHelper.generateId(),
            ingredients: [ingredient.id],
            ...extra,
        };
    }

    static createRecipesList(length = 2): Recipe[] {
        return Array.from({ length }, () => this.createRecipe());
    }
}
