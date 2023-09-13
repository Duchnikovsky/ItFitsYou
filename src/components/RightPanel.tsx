import CSS from "@/styles/home.module.css";
import Calculator from "@/components/calculator/Calculator";
import SignOutButton from "@/components/auth/SignOutButton";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default async function RightPanel() {
  return (
    <div className={CSS.rightPanel}>
      <div className={CSS.calculatorArea}>
        <Calculator />
      </div>
      <Link href={'/calculator'} className={CSS.calculatorButton}>
        <Button
          width="350px"
          height="2.25rem"
          fontSize="18px"
          isDisabled={false}
          isLoading={false}
          margin={"0.5rem auto 0 auto"}
          type="button"
        >
          Calorie calculator
        </Button>
      </Link>
      <SignOutButton />
    </div>
  );
}
