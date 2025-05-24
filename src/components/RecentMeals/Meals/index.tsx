import useMeals from "../hooks/useMeals/useMeals";
import { MealsProps } from "./interface";
import { Meal } from "./Meal";
import styles from "./Meals.module.css";

const Meals = ({ activeDay }: MealsProps) => {
    const { meals } = useMeals({ activeDay });

    return (
        <div className={styles.meals}>
            {meals?.map((meal) => (
                <div className={styles.meal} key={meal.id}>
                    <div className={styles.name}>{meal.name}</div>
                    <div className={styles.kcal}>
                        <div className={styles.label}>Calories</div>
                        <div className={styles.kcalCount}>{meal.kcalCount}</div>
                    </div>
                    <div className={styles.mealItems}>
                        {meal.food.map((food) => (
                            <Meal food={food} key={food.mealId + food.id}/>
                        ))}
                        <div className={styles.newItem}>+ Add</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Meals;
