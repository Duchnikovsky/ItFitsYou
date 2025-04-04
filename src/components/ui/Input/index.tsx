import { forwardRef } from "react";
import { InputProps } from "./interface";
import style from "./Input.module.css";

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    return (
      <div className={style.input_wrapper}>
        <label className={style.label}>{label}</label>
        <input ref={ref} {...props} className={style.input} />
      </div>
    );
  }
);

export default Input;
