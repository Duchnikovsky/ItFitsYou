"use client";
import style from "./PasswordRecovery.module.css";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";
import { EmailRecoveryForm } from "./EmailForm";
import { PasswordRecoveryForm } from "./PasswordsForm";
import Link from "next/link";

const PasswordRecovery = () => {
    const [mode, setMode] = useState<string>();
    const [token, setToken] = useState("");

    useEffect(() => {
        const url = new URL(window.location.href);
        const token = url.searchParams.get("token");
        if (token) {
            setMode("token");
            setToken(token);
        } else {
            setMode("email");
        }
    }, []);

    return (
        <div className={style.passwordRecovery_wrapper}>
            <div className={style.passwordRecovery}>
                <Link href="/">
                    <Image src={logo} alt="logo" width={64} />
                </Link>
                <h2>Reset Password</h2>
                {mode === "token" ? (
                    <PasswordRecoveryForm token={token} />
                ) : (
                    <EmailRecoveryForm />
                )}
            </div>
        </div>
    );
};

export default PasswordRecovery;
