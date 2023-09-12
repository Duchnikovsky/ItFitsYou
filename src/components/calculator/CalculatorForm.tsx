"use client";
import CSS from "@/styles/calculator.module.css";
import { Input2 } from "@/components/ui/Input";
import { useState } from "react";
import Genders from "@/components/calculator/Genders";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CalculatorRequest } from "@/lib/validators/calculator";

interface CalculatorFormProps {
  calculate: (payload: CalculatorRequest) => void;
}

export default function CalculatorForm({ calculate }: CalculatorFormProps) {
  const [gender, setGender] = useState<number>();
  const [values, setValues] = useState({
    age: "",
    height: "",
    weight: "",
    activity: "0",
    goal: "0",
  });

  return (
    <form
      className={CSS.form}
      onSubmit={(e) => {
        e.preventDefault();
        calculate({
          gender: gender || 0,
          age: parseInt(values["age"]),
          height: parseInt(values["height"]),
          weight: parseInt(values["weight"]),
          activity: parseInt(values["activity"]),
          goal: parseInt(values["goal"]),
        });
      }}
    >
      <div className={CSS.upperInputs}>
        <div className={CSS.inputs}>
          <div className={CSS.inputArea}>
            <div className={CSS.label}>
              <span className={CSS.labelText}>Age</span>:
            </div>
            <Input2
              type="number"
              width="60px"
              height="2.25rem"
              fontSize="16px"
              isDisabled={false}
              value={values["age"]}
              required
              onChange={(e) =>
                setValues({ ...values, ["age"]: e.target.value })
              }
            />
          </div>
          <div className={CSS.inputArea}>
            <div className={CSS.label}>
              <span className={CSS.labelText}>Height</span>(cm):
            </div>
            <Input2
              type="number"
              width="60px"
              height="2.25rem"
              fontSize="16px"
              isDisabled={false}
              required
              value={values["height"]}
              onChange={(e) =>
                setValues({ ...values, ["height"]: e.target.value })
              }
            />
          </div>
          <div className={CSS.inputArea}>
            <div className={CSS.label}>
              <span className={CSS.labelText}>Weight</span> (kg):
            </div>
            <Input2
              type="number"
              width="60px"
              height="2.25rem"
              fontSize="16px"
              isDisabled={false}
              value={values["weight"]}
              required
              onChange={(e) =>
                setValues({ ...values, ["weight"]: e.target.value })
              }
            />
          </div>
        </div>
        <Genders gender={gender!} setGender={(gender) => setGender(gender)} />
      </div>
      <div className={CSS.widerInputArea}>
        <div className={CSS.label}>
          <span className={CSS.labelText}>Activity</span>:
        </div>
        <Select
          width="200px"
          height="2.25rem"
          fontSize="17px"
          name="activity"
          id="activity"
          onChange={(e) =>
            setValues({ ...values, ["activity"]: e.target.value })
          }
        >
          <option value="0">No activity</option>
          <option value="1">1-3 exercises a week</option>
          <option value="2">4-5 exercises a week</option>
          <option value="3">6-7 exercises a week</option>
        </Select>
      </div>
      <div className={CSS.widerInputArea}>
        <div className={CSS.label}>
          <span className={CSS.labelText}>Your goal</span>:
        </div>
        <Select
          width="200px"
          height="2.25rem"
          fontSize="17px"
          name="goal"
          id="goal"
          onChange={(e) => setValues({ ...values, ["goal"]: e.target.value })}
        >
          <option value="0">Keep weight</option>
          <option value="1">Gain weight</option>
          <option value="2">Lose weight</option>
        </Select>
      </div>
      <Button
        width="100%"
        height="2.25rem"
        fontSize="20px"
        isDisabled={false}
        isLoading={false}
        margin={"1rem 0 0 0"}
        type="submit"
      >
        Calculate
      </Button>
    </form>
  );
}
