import CSS from "@/styles/home.module.css";
import Calculator from "@/components/calculator/Calculator";
import SignOutButton from "@/components/auth/SignOutButton";

export default async function RightPanel() {

  return <div className={CSS.rightPanel}>
    <Calculator />
    <SignOutButton />
  </div>;
}
