import { MealTypes } from "@/lib/validators/meals";
import CSS from "../../styles/meals.module.css";
import { AddButton } from "@/components/ui/Button";
import Dish from "./Dish";

interface MealProps {
  meal: MealTypes;
  isLoading: boolean;
}

export default function Meal({ meal, isLoading }: MealProps) {
  return (
    <div className={CSS.mealDiv} key={meal.id}>
      <div className={CSS.mealHeader}>
        <div>{meal.name}</div>
        <div className={CSS.kcalCount}>{meal.kcalCount} kcal</div>
      </div>
      {meal.food.map((food) => (
        <Dish dish={food} key={food.id}/>
      ))}
      <div className={CSS.buttonDiv}>
        <AddButton isDisabled={false} isLoading={isLoading}>
          +
        </AddButton>
      </div>
    </div>
  );
}
