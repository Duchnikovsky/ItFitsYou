import CSS from "@/styles/calculator.module.css";
import CalculatorForm from "@/components/calculator/CalculatorForm";

export default function Calculator() {
  return (
    <div className={CSS.main}>
      <div className={CSS.header}>CALORIE CALCULATOR</div>
      <CalculatorForm />
    </div>
  );
}
