"use client";
import { MealTypes } from "@/lib/validators/meals";
import CSS from "../../styles/meals.module.css";
import { AddButton } from "@/components/ui/Button";
import Dish from "./Dish";
import { useState } from "react";
import CreatorModal from "@/components/modal/CreatorModal";

interface MealProps {
  meal: MealTypes;
  isLoading: boolean;
  refetch: () => void;
}

export default function Meal({ meal, isLoading, refetch }: MealProps) {
  const [modal, toggleModal] = useState<boolean>();
  return (
    <div className={CSS.mealDiv} key={meal.id}>
      <div className={CSS.mealHeader}>
        <div>{meal.name}</div>
        <div className={CSS.kcalCount}>{meal.kcalCount} kcal</div>
      </div>
      {meal.food.map((food) => (
        <Dish dish={food} key={food.id} refetch={() => refetch()} />
      ))}
      <div className={CSS.buttonDiv}>
        <AddButton
          isDisabled={false}
          isLoading={isLoading}
          onClick={() => toggleModal(true)}
        >
          +
        </AddButton>
      </div>
      {modal && (
        <CreatorModal
          category={meal.name}
          toggleModal={(bool: boolean) => {
            toggleModal(bool);
            refetch();
          }}
          meal={meal}
        />
      )}
    </div>
  );
}
