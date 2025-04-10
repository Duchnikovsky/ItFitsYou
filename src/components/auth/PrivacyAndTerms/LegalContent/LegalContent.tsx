"use client";

import React from "react";
import { legalText } from "./legalText";
import style from "../PaT.module.css";

interface Props {
    activeLink: "Privacy" | "Terms";
}

const LegalContent = ({ activeLink }: Props) => {
    return (
        <div
            className={style.legalContent}
            dangerouslySetInnerHTML={{ __html: legalText[activeLink] }}
        />
    );
};

export { LegalContent };
