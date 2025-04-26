"use client";
import { DaySelectorProps } from "./interface";
import style from "./DaySelector.module.css";
import cs from "classnames";

const DaySelector = ({ days }: DaySelectorProps) => {
    const { activeDay, week } = days;

    return (
        <div className={style.daySelector}>
            {week.map((day, index) => (
                <div
                    key={index}
                    className={cs(style.day, {
                        [style.active]:
                            activeDay.getDate() === day.date.getDate(),
                    })}
                    onClick={() => days.setActiveDay(day.date)}
                >
                    <span className={style.name}>{day.day}</span>
                    <b>{day.date.getDate()}</b>
                </div>
            ))}
        </div>
    );
};

export default DaySelector;
