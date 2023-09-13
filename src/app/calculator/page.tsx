import Header from "@/components/Header";
import Calculator from "@/components/calculator/Calculator";
import CSS from "@/styles/calculator.module.css";

export default function page() {
  return (
    <div className={CSS.page}>
      <Header />
      <Calculator />
    </div>
  );
}
