"use client";
import useSignIn from "./hooks/useSignIn";
import style from "./SignIn.module.css";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { SignInInputs } from "./helper";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import Link from "next/link";

const SignIn = () => {
    const { formValues, setFormValues, checked, setChecked, login, loading } =
        useSignIn();

    return (
        <div className={style.signIn_wrapper}>
            <div className={style.signIn}>
                <Image src={logo} alt="logo" width={64} />
                <h2>Welcome to It Fits You</h2>
                <h4 className={style.h4}>
                    Please enter your details to sign in
                </h4>
                <form
                    className={style.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        login();
                    }}
                >
                    {SignInInputs.map((input) => (
                        <div key={input.label} className={style.input_wrapper}>
                            <label>{input.label}</label>
                            <Input
                                type={input.type}
                                name={input.label}
                                placeholder={input.placeholder}
                                pattern={input.pattern}
                                maxLength={input.maxLength}
                                required
                                value={formValues[input.label]}
                                onChange={(e) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        [input.label]: e.target.value,
                                    }));
                                }}
                            />
                        </div>
                    ))}
                    <div className={style.remember}>
                        <Checkbox
                            checked={checked}
                            onClick={() => setChecked((prev) => !prev)}
                        >
                            Remember me
                        </Checkbox>
                        <Link
                            href="/forgot-password"
                            className={style.forgotPassword}
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Button type="submit" loading={loading}>
                        Sign In
                    </Button>
                </form>
                <h4 className={style.redirection}>
                    Don't have an account? <Link href="/signUp">Sign up</Link>
                </h4>
            </div>
        </div>
    );
};

export default SignIn;
