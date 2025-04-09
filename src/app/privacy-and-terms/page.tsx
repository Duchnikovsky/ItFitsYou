"use client";
import { useCallback, useEffect, useState } from "react";
import style from "./PaT.module.css";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import cs from "classnames";
import { LegalContent } from "./LegalContent/LegalContent";
import Link from "next/link";

export default function PaT() {
    const [activeLink, setActiveLink] = useState<"Privacy" | "Terms">(
        "Privacy"
    );

    useEffect(() => {
        const hash = window.location.hash;
        setActiveLink(hash === "#Terms" ? "Terms" : "Privacy");
    }, []);

    const handleLinkChange = useCallback((link: "Privacy" | "Terms") => {
        setActiveLink(link);
        window.location.hash = link;
    }, []);

    return (
        <div className={style.PaT_wrapper}>
            <div className={style.header}>
                <Link href="/">
                    <Image src={logo} alt="logo" width={48} />
                </Link>
                <h2>Legal Documents</h2>
            </div>
            <div className={style.PaT}>
                <ul className={style.headerLinks}>
                    <li
                        className={cs(style.link, {
                            [style.active]: activeLink === "Privacy",
                        })}
                        onClick={() => handleLinkChange("Privacy")}
                    >
                        Privacy Policy
                    </li>
                    <li
                        className={cs(style.link, {
                            [style.active]: activeLink === "Terms",
                        })}
                        onClick={() => handleLinkChange("Terms")}
                    >
                        Terms of Service
                    </li>
                </ul>
                <LegalContent activeLink={activeLink} />
            </div>
        </div>
    );
}
