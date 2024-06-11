import FactoryHelper from './FactoryHelper';
import { Ingredient } from '../types/resources';

export default class Ingredients {
    static createIngredient(extra: Partial<Ingredient> = {}): Ingredient {
        return {
            id: FactoryHelper.generateId(),
            name: FactoryHelper.generateString(),
            ...extra,
        };
    }
}
