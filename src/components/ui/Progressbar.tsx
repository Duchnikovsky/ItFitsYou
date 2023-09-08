import CSS from "@/styles/ui.module.css";
import { useEffect, useState } from "react";

type PropsTypes = {
  value: number;
  maxValue: number;
  text: string | number;
};

export default function ProgressBar({ value, maxValue, text }: PropsTypes) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((value / maxValue) * 100);
  }, [value]);

  return (
    <div className={CSS.progressBar}>
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          maxWidth: "100%",
        }}
      ></div>
      <span>
        {value}/{text}
      </span>
    </div>
  );
}
