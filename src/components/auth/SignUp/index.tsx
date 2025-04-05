"use client";
import style from "./SignUp.module.css";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import Input from "@/components/ui/Input";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { SignUpInputs } from "./helper";
import useSignUp from "./hooks/useSignUp";

const SignIn = () => {
    const {
        formValues,
        setFormValues,
        checked,
        setChecked,
        register,
        loading,
    } = useSignUp();

    return (
        <div className={style.signUp_wrapper}>
            <div className={style.signUp}>
                <Image src={logo} alt="logo" width={64} />
                <h2>Create an account</h2>
                <h4 className={style.h4}>Enter your details to get started</h4>
                <form
                    className={style.form}
                    onSubmit={(e) => {
                        e.preventDefault();
                        register();
                    }}
                >
                    {SignUpInputs.map((input) => (
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
                    <div className={style.agreement}>
                        <Checkbox
                            checked={checked}
                            onClick={() => setChecked((prev) => !prev)}
                        >
                            I agree to the{" "}
                            <Link href="/terms">Terms of Service</Link> and{" "}
                            <Link href="/privacy">Privacy Policy</Link>
                        </Checkbox>
                    </div>
                    <Button type="submit" loading={loading}>
                        Sign Up
                    </Button>
                </form>
                <h4 className={style.redirection}>
                    Already have an account? <Link href="/signIn">Sign In</Link>
                </h4>
            </div>
        </div>
    );
};

export default SignIn;
