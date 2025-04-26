"use client";
import DaySelector from "./DaySelector";
import useDay from "./hooks/useDay";
import style from "./RecentMeals.module.css";

const PreviousMeals = () => {
    const days = useDay();

    return (
        <div className={style.sidebar}>
            <div className={style.sidebar__header}>
                <h2>Recent Meals</h2>
                <p className={style.subheading}>
                    Track your daily nutrition intake
                </p>
            </div>
            <DaySelector days={days} />
        </div>
    );
};

export default PreviousMeals;
