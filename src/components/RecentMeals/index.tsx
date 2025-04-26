"use client";
import DaySelector from "./DaySelector";
import useMeals from "./hooks/useDay";
import style from "./RecentMeals.module.css";

const PreviousMeals = () => {
    const meals = useMeals();

    const { activeDay } = meals;

    return (
        <div className={style.sidebar}>
            <div className={style.sidebar__header}>
                <h2>Recent Meals</h2>
                <p className={style.subheading}>
                    Track your daily nutrition intake
                </p>
            </div>
            <DaySelector meals={meals} />
        </div>
    );
};

export default PreviousMeals;
