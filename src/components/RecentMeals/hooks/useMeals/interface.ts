interface UseMealsProps {
    activeDay: Date;
}

interface FoodTypes {
    mealId: string;
    id: string;
    name: string;
    kcal: number;
    carbohydrate: number;
    fat: number;
    protein: number;
}

interface MealsTypes {
    id: string;
    userID: string;
    category: string;
    food: FoodTypes;
    foodId: string;
    serving: number;
    day: Date;
}

interface MealTypes {
  id: number;
  name: string;
  food: FoodTypes[];
  kcalCount: number;
}

export type { UseMealsProps, FoodTypes, MealsTypes, MealTypes };
