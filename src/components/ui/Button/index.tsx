import { forwardRef } from "react";
import { ButtonProps } from "./interface";
import cs from "classnames";
import style from "./Button.module.css";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, children, loading, ...props }, ref) => {
    const { disabled } = props;

    return (
      <button
        className={cs(style.button, variant, {
          [style.loading]: loading,
          [style.disabled]: disabled,
        })}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
export default Button;
