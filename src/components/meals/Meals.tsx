"use client";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import CSS from "@/styles/meals.module.css";
import { useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import axios from "axios";
import { MealTypes, MealsTypes } from "@/lib/validators/meals";
import Meal from "@/components/meals/Meal";
import { DayContext } from "@/components/LeftPanel";
import Summary from "@/components/Summary";


export default function Meals() {
  const [meals, setMeals] = useState<MealTypes[]>([
    { id: 0, name: "BREAKFAST", food: [], kcalCount: 0 },
    { id: 1, name: "II BREAKFAST", food: [], kcalCount: 0 },
    { id: 2, name: "LUNCH", food: [], kcalCount: 0 },
    { id: 3, name: "DINNER", food: [], kcalCount: 0 },
    { id: 4, name: "SNACKS", food: [], kcalCount: 0 },
  ]);
  const [values, setValues] = useState<number[]>([0, 0, 0, 0]);

  const day = useContext(DayContext)

  const { refetch, isLoading, isRefetching } = useQuery({
    queryKey: ["meals-query"],
    queryFn: async () => {
      const { data } = await axios.get(`/api/meals/get?day=${day}`);
      return data;
    },
    onSuccess: (data) => {
      const initialMeals: MealTypes[] = [
        { id: 0, name: "BREAKFAST", food: [], kcalCount: 0 },
        { id: 1, name: "II BREAKFAST", food: [], kcalCount: 0 },
        { id: 2, name: "LUNCH", food: [], kcalCount: 0 },
        { id: 3, name: "DINNER", food: [], kcalCount: 0 },
        { id: 4, name: "SNACKS", food: [], kcalCount: 0 },
      ];
      const initValues = [0, 0, 0, 0];
      setMeals(initialMeals);
      setValues(initValues);
      const newValues = [...initValues];
      const newMeals: MealTypes[] = [...initialMeals];
      data.map((meal: MealsTypes) => {
        const category = meal.category;
        const mealIndex = newMeals.findIndex(
          (meal: MealTypes) => meal.id === category
        );
        if (mealIndex !== -1) {
          const kcal = Math.ceil((meal.food.kcal / 100) * meal.serving);
          const carbohydrate = Math.ceil(
            (meal.food.carbohydrate / 100) * meal.serving
          );
          const fat = Math.ceil((meal.food.fat / 100) * meal.serving);
          const protein = Math.ceil((meal.food.protein / 100) * meal.serving);
          newMeals[mealIndex].kcalCount = newMeals[mealIndex].kcalCount + kcal;
          newValues[0] = newValues[0] + kcal;
          newValues[1] = newValues[1] + carbohydrate;
          newValues[2] = newValues[2] + fat;
          newValues[3] = newValues[3] + protein;
          newMeals[mealIndex].food.push({
            mealId: meal.id,
            id: meal.food.id,
            name: meal.food.name,
            kcal: kcal,
            carbohydrate: carbohydrate,
            fat: fat,
            protein: protein,
          });
        }
      });
      setValues(newValues)
    },
    enabled: false,
  });

  const request = debounce(async () => {
    refetch();
  }, 200);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current === true) {
      firstLoad.current = false;
      return;
    }
    debounceRequest();
  }, [day]);

  return (
    <>
    <div className={CSS.main}>
      {meals.map((meal) => (
        <Meal
          meal={meal}
          isLoading={isRefetching || isLoading}
          key={meal.id}
          refetch={() => refetch()}
        />
      ))}
    </div>
    <div className={CSS.summary}>
      <Summary values={values}/>
    </div>
    </>
  );
}
