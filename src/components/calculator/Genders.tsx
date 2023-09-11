import CSS from "@/styles/calculator.module.css";

interface GendersProps {
  gender: number;
  setGender: (gender: number) => void;
}

export default function Genders({ gender, setGender }: GendersProps) {
  return (
    <div className={CSS.genders}>
      <div className={CSS.gender}>
        <div
          className={`${gender === 0 ? CSS.genderPicked : CSS.genderPick}`}
          onClick={() => setGender(0)}
        >
          MAN
        </div>
      </div>
      <div className={CSS.gender}>
        <div
          className={`${gender === 1 ? CSS.genderPicked : CSS.genderPick}`}
          onClick={() => setGender(1)}
        >
          WOMAN
        </div>
      </div>
    </div>
  );
}
