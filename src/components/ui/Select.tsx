import React from "react";
import CSS from "@/styles/ui.module.css";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  width: string;
  height: string;
  fontSize: string;
  margin?: string | 0;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, width, height, fontSize, margin, ...props }, ref) => {
    return (
      <div
        className={CSS.selectContainer}
        style={{ width: width, height: height, margin: margin }}
      >
        <select
          className={CSS.select}
          style={{
            fontSize: fontSize,
            margin: margin,
          }}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className={CSS.selectIcon} />
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };
