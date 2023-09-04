import React from "react";
import { Circle, Loader2 } from "lucide-react";
import CSS from "@/styles/ui.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  isDisabled: boolean;
  width: string;
  height: string;
  fontSize: string;
  margin?: string | 0;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      isLoading,
      isDisabled,
      width,
      height,
      fontSize,
      margin,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={CSS.button}
        style={{
          width: width,
          height: height,
          fontSize: fontSize,
          margin: margin,
        }}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? <Loader2 className={CSS.loader} size={fontSize} /> : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

interface AddButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
  isDisabled: boolean;
  margin?: string | 0;
}

const AddButton = React.forwardRef<HTMLButtonElement, AddButtonProps>(
  ({ children, isLoading, isDisabled, margin, ...props }, ref) => {
    return (
      <button
        className={CSS.addButton}
        style={{
          margin: margin,
        }}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {isLoading ? <><Circle className={CSS.loaderTrail} /><Loader2 className={CSS.loader} /> </>: <>{children}</>}
      </button>
    );
  }
);

AddButton.displayName = "AddButton";

export { Button, AddButton };
