import { FoodTypes } from "../../hooks/useMeals/interface";
import styles from "./Meal.module.css";

type Props = {
    food: FoodTypes
};

export const Meal = ({food}: Props) => {
    return <div className={styles.mealItem}>
        {food.name}
    </div>;
};
