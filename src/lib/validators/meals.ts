export interface FoodTypes {
  mealId: string,
  id: string,
  name: string,
  kcal: number,
  carbohydrate: number,
  fat: number,
  protein: number,
}

export interface MealsTypes {
  id: string,
  userEmail: string,
  category: number,
  food: FoodTypes,
  foodId: string,
  serving: number,
  day: Date,
}

export interface MealTypes{
  id: number,
  name: string,
  food: FoodTypes[],
  kcalCount: number,
}

export const initialMeals: MealTypes[] = [
  { id: 0, name: "BREAKFAST", food: [], kcalCount: 0 },
  { id: 1, name: "II BREAKFAST", food: [], kcalCount: 0 },
  { id: 2, name: "LUNCH", food: [], kcalCount: 0 },
  { id: 3, name: "DINNER", food: [], kcalCount: 0 },
  { id: 4, name: "SNACKS", food: [], kcalCount: 0 },
];

export const initialValues = [0, 0, 0, 0]