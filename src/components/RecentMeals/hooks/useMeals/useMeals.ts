import { useState } from "react";
import { MealsTypes, MealTypes, UseMealsProps } from "./interface";
import { initialMeals } from "./helper";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { ZodError } from "zod";

const useMeals = ({ activeDay }: UseMealsProps) => {
    const [meals, setMeals] = useState<MealTypes[]>(initialMeals);

    useQuery({
        queryKey: ["meals-query", activeDay],
        enabled: true,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        queryFn: async () => {
            const { data }: { data: MealsTypes[] } = await axios.get(
                "/api/meals/get?day=" + activeDay
            );
            return data;
        },
        onSuccess: (data) => {
            const newMeals: MealTypes[] = [...initialMeals];
            newMeals.forEach((meal) => {
                meal.food = [];
                meal.kcalCount = 0;
            });
            data.forEach((meal) => {
                const mealIndex = newMeals.findIndex(
                    (m) => m.name.toUpperCase() === meal.category
                );
                if (mealIndex !== -1) {
                    const kcal = Math.ceil(
                        (meal.food.kcal / 100) * meal.serving
                    );
                    const carbohydrate = Math.ceil(
                        (meal.food.carbohydrate / 100) * meal.serving
                    );
                    const fat = Math.ceil((meal.food.fat / 100) * meal.serving);
                    const protein = Math.ceil(
                        (meal.food.protein / 100) * meal.serving
                    );

                    newMeals[mealIndex].food.push({
                        mealId: meal.id,
                        id: meal.foodId,
                        name: meal.food.name,
                        kcal,
                        carbohydrate,
                        fat,
                        protein,
                    });

                    newMeals[mealIndex].kcalCount += kcal;
                }
            });
            setMeals(newMeals);
        },
        onError: (error) => {
            if (error instanceof ZodError) {
                return toast.error(error.errors[0].message);
            }
            return toast.error("Failed to fetch meals");
        },
    });

    return { meals };
};

export default useMeals;
