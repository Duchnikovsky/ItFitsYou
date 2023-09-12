"use client";
import CSS from "@/styles/calculator.module.css";
import CalculatorForm from "@/components/calculator/CalculatorForm";
import { useState } from "react";
import { CalculatorRequest } from "@/lib/validators/calculator";
import CalculatorResult from "@/components/calculator/CalculatorResult";

const activityMultiplier = [1.2, 1.375, 1.55, 1.725];
const goalMultiplier = [1, 1.2, 0.8];

export default function Calculator() {
  const [result, setResult] = useState<number[]>([]);

  function calculate(payload: CalculatorRequest) {
    const gender = payload.gender;
    const age = payload.age;
    const height = payload.height;
    const weight = payload.weight;
    const activity = payload.activity;
    const goal = payload.goal;
    if (age > 0 && height > 0 && weight > 0 && gender !== 2) {
      if (gender === 0) {
        const PPM = Math.ceil(
          (66.5 + 13.75 * weight + 5 * height - 6.75 * age) *
            activityMultiplier[activity] *
            goalMultiplier[goal]
        );
        const lowCarbohydrates = Math.ceil((PPM / 4) * (45 / 100));
        const highCarbohydrates = Math.ceil((PPM / 4) * (65 / 100));
        const lowFats = Math.ceil((PPM / 9) * (25 / 100));
        const highFats = Math.ceil((PPM / 9) * (30 / 100));
        const lowProteins = Math.ceil((PPM / 4) * (12 / 100));
        const highProteins = Math.ceil((PPM / 4) * (2 / 10));
        setResult([
          PPM,
          lowCarbohydrates,
          highCarbohydrates,
          lowFats,
          highFats,
          lowProteins,
          highProteins,
        ]);
      } else if (gender === 1) {
        const PPM = Math.ceil(
          (655.1 + 9.56 * weight + 1.85 * height - 4.68 * age) *
            activityMultiplier[activity] *
            goalMultiplier[goal]
        );
        const lowCarbohydrates = Math.ceil((PPM / 4) * (45 / 100));
        const highCarbohydrates = Math.ceil((PPM / 4) * (65 / 100));
        const lowFats = Math.ceil((PPM / 9) * (25 / 100));
        const highFats = Math.ceil((PPM / 9) * (30 / 100));
        const lowProteins = Math.ceil((PPM / 4) * (12 / 100));
        const highProteins = Math.ceil((PPM / 4) * (2 / 10));
        setResult([
          PPM,
          lowCarbohydrates,
          highCarbohydrates,
          lowFats,
          highFats,
          lowProteins,
          highProteins,
        ]);
      }
    }
  }

  return (
    <div className={CSS.main}>
      <div className={CSS.header}>CALORIE CALCULATOR</div>
      {result.length > 0 ? (
        <CalculatorResult result={result} reset={() => setResult([])} />
      ) : (
        <CalculatorForm
          calculate={(payload: CalculatorRequest) => calculate(payload)}
        />
      )}
    </div>
  );
}
