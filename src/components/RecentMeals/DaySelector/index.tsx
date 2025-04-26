"use client";
import { DaySelectorProps } from "./interface";
import style from "./DaySelector.module.css";
import cs from "classnames";

const DaySelector = ({ meals }: DaySelectorProps) => {
    const { activeDay, days } = meals;

    return (
        <div className={style.daySelector}>
            {days.map((day, index) => (
                <div
                    key={index}
                    className={cs(style.day, {
                        [style.active]:
                            activeDay.getDate() === day.date.getDate(),
                    })}
                    onClick={() => meals.setActiveDay(day.date)}
                >
                    <span className={style.name}>{day.day}</span>
                    <b>{day.date.getDate()}</b>
                </div>
            ))}
        </div>
    );
};

export default DaySelector;
