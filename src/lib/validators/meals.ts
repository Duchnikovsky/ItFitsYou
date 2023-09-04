import { z } from "zod";

export interface FoodTypes {
  mealId: string;
  id: string;
  name: string;
  kcal: number;
  carbohydrate: number;
  fat: number;
  protein: number;
}

export interface MealsTypes {
  id: string;
  userEmail: string;
  category: number;
  food: FoodTypes;
  foodId: string;
  serving: number;
  day: Date;
}

export interface MealTypes {
  id: number;
  name: string;
  food: FoodTypes[];
  kcalCount: number;
}

export interface FoodDetailsTypes {
  id: string;
  name: string;
  kcal: number;
  carbohydrate: string;
  fat: string;
  protein: string;
}

export const MealValidator = z.object({
  id: z.string(),
  category: z.number(),
  serving: z
    .number()
    .or(z.undefined()),
  day: z.coerce.date()
});

export type MealAddRequest = z.infer<typeof MealValidator>;
