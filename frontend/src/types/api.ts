interface Dishes {
  name: string;
  seasonings: {
    name: string;
    amountUnit: string;
  }[];
  ingredients: {
    name: string;
    amountUnit: string;
  }[];
}

interface Menu {
  name: string;
  dishes: Dishes[];
}

export interface CreateMenuResponse {
  contents: Menu[];
}

interface Recipe {
  recipe: {
    menu: {
      name: string;
      procedure: {
        index: number;
        detail: string;
      }[];
    };
  };
}

export interface CreateRecipeResponse {
  contents: Recipe[];
}
