export type Recipe = {
    id: string;
    name: string;
    author_id: string;
    ingredients: string[];
};

export type Ingredient = {
    id: string;
    name: string;
};
