"use client";
import React, { createContext, useState } from "react";
import CSS from "@/styles/home.module.css";
import Days from "@/components/meals/Days";
import Meals from "@/components/meals/Meals";

interface ObjectWithDate {
  day: string;
  date: Date;
}

export const DayContext = createContext<Date>(new Date());

export default function LeftPanel() {
  const [day, setDay] = useState<Date>(new Date());

  return (
    <DayContext.Provider value={day}>
      <div className={CSS.leftPanel}>
        <Days changeDay={(e: ObjectWithDate) => setDay(e.date)} />
        <Meals />
      </div>
    </DayContext.Provider>
  );
}
