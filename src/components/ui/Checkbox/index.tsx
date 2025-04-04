import { CheckboxProps } from "./interface";
import cs from "classnames";
import style from "./Checkbox.module.css";

const Checkbox = ({ children, checked, onClick }: CheckboxProps) => {
  return (
    <div className={style.checkbox_wrapper}>
      <div
        className={cs(style.checkbox, { [style.checked]: checked })}
        onClick={onClick}
      ></div>
      <span onClick={onClick} className={style.label}>{children}</span>
    </div>
  );
};

export default Checkbox;
