import { FoodTypes } from "@/lib/validators/meals";
import CSS from "@/styles/meals.module.css";

interface DishProps {
  dish: FoodTypes;
}

export default function Dish({ dish }: DishProps) {
  return (
    <div className={CSS.dish}>
      <div className={CSS.dishHeader}>
        <div>
          {dish.name}
          <span className={CSS.dishKcal}> {dish.kcal} kcal</span>
        </div>
        <div className={CSS.dishRemove}>X</div>
      </div>
      <div className={CSS.dishContent}>
        <div className={CSS.dishNutrient}>
          <div className={CSS.dishNutrientKcal}>{dish.carbohydrate}</div>
          <div>Carbohydrates</div>
        </div>
        <div className={CSS.dishNutrient}>
          <div className={CSS.dishNutrientKcal}>{dish.fat}</div>
          <div>Fats</div>
        </div>
        <div className={CSS.dishNutrient}>
          <div className={CSS.dishNutrientKcal}>{dish.protein}</div>
          <div>Proteins</div>
        </div>
      </div>
    </div>
  );
}
