import Button from "@/components/ui/Button";
import useSignIn from "./hooks/useSignIn";
import style from "./SignIn.module.css";

const SignIn = () => {
  const skibidi = useSignIn();

  return (
    <div className={style.signIn}>
      <div className={style.closed}>
        <p>Closed window</p>
        <Button variant="variant_1">Sign In</Button>
      </div>
      <Button variant="variant_2">Sign In</Button>
    </div>
  );
};

export default SignIn;
