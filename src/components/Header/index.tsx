"use client";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import style from "./Header.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const session = useSession();

    return (
        <div className={style.header}>
            <div className={style.title}>
                <Link href="/" className={style.logo}>
                    <Image src={logo} alt="logo" width={36} />
                </Link>
                <h1>ItFitsYou</h1>
            </div>
            <div className={style.user}>
                <span className={style.userName}>
                    {session.data?.user.email}
                </span>
            </div>
        </div>
    );
};

export default Header;
