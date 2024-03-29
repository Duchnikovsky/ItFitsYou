"use client";
import { useEffect, useRef, useState } from "react";
import CSS from "@/styles/days.module.css";
import { startOfWeek, addDays } from "date-fns";

interface ObjectWithDate {
  day: string;
  date: Date;
}

interface DaysProps {
  changeDay: (e: ObjectWithDate) => void;
}

function assignDatesToObjects(objects: { day: string }[]): ObjectWithDate[] {
  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const today = new Date();
  const startDate = startOfWeek(today);

  const objectsWithDates = objects.map(
    (obj: { day: string }, index: number) => {
      const dayIndex = weekdays.indexOf(obj.day) + 1;
      const date = addDays(startDate, dayIndex);

      return {
        ...obj,
        date,
      };
    }
  );

  return objectsWithDates;
}

export default function Days({ changeDay }: DaysProps) {
  const [activeDay, setActiveDay] = useState<number>(10);
  const [objects, setObjects] = useState<ObjectWithDate[]>([]);
  const firstLoad = useRef<boolean>(true);

  function changeDayHandler(day: number) {
    setActiveDay(day);
    changeDay(objects[day]);
  }

  const days: { day: string }[] = [
    { day: "MON" },
    { day: "TUE" },
    { day: "WED" },
    { day: "THU" },
    { day: "FRI" },
    { day: "SAT" },
    { day: "SUN" },
  ];

  useEffect(() => {
    const objectsWithDates: ObjectWithDate[] = assignDatesToObjects(days);
    setObjects(objectsWithDates);
  }, []);

  useEffect(() => {
    if (firstLoad.current === true) {
      firstLoad.current = false;
      return;
    }
    const date = new Date();
    changeDayHandler(date.getDay() - 1);
  }, [objects]);

  return (
    <div className={CSS.days}>
      {objects.map((object, index: number) => (
        <div
          key={index}
          className={`${activeDay === index ? CSS.dayActive : CSS.day}`}
          onClick={() => changeDayHandler(index)}
        >
          {object.day}
        </div>
      ))}
    </div>
  );
}
