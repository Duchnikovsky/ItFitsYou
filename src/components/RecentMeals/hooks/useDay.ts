import { useState } from "react";
import { startOfWeek, addDays } from "date-fns";

const daysOfWeek: { day: string }[] = [
    { day: "Mon" },
    { day: "Tue" },
    { day: "Wed" },
    { day: "Thu" },
    { day: "Fri" },
    { day: "Sat" },
    { day: "Sun" },
];

interface Days {
    day: string;
    date: Date;
}

const assignDates = () => {
    const today = new Date();
    const startDate = startOfWeek(today, { weekStartsOn: 1 });

    const objectsWithDates = daysOfWeek.map((obj, index) => {
        const date = addDays(startDate, index);
        return { ...obj, date };
    });

    return objectsWithDates;
};

const useDay = () => {
    const [activeDay, setActiveDay] = useState<Date>(new Date());
    const week: Days[] = assignDates();

    return { activeDay, setActiveDay, week };
};

export default useDay;
