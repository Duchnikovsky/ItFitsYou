import { GanttChartSquare } from "lucide-react";
import CSS from "@/styles/calculator.module.css";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { AsignRequest } from "@/lib/validators/calculator";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface CalculatorResultProps {
  result: number[];
  reset: () => void;
}

export default function CalculatorResult({
  result,
  reset,
}: CalculatorResultProps) {
  const { data: session } = useSession();
  const [disabled, setDisabled] = useState<boolean>(false);
  const route = useRouter()

  const { mutate: calculate, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: AsignRequest = {
        kcal: result[0],
        lowC: result[1],
        highC: result[2],
        lowF: result[3],
        highF: result[4],
        lowP: result[5],
        highP: result[6],
      };

      const { data } = await axios.post("/api/calculator", payload);

      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        return toast.error(err.response?.data, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      return toast.error("An error occured", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
    onSuccess: () => {
      reset();
      return toast.success("Successfully assigned data", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    },
  });

  return (
    <div className={CSS.results}>
      <GanttChartSquare size={60} className={CSS.chartIcon} />
      <div className={CSS.headerText}>
        To achieve your desired weight you must eat
      </div>
      <div className={CSS.kcalArea}>
        <b>{result[0]}</b>
        <div className={CSS.lowerText}>CALORIES</div>
      </div>
      <div className={CSS.nutrientsArea}>
        <div className={CSS.sideNutrientArea}>
          <b>
            {result[1]}-{result[2]}
          </b>
          <div className={CSS.lowerText}>CARBOHYDRATES</div>
        </div>
        <div className={CSS.centerNutrientArea}>
          <b>
            {result[3]}-{result[4]}
          </b>
          <div className={CSS.lowerText}>FATS</div>
        </div>
        <div className={CSS.sideNutrientArea}>
          <b>
            {result[5]}-{result[6]}
          </b>
          <div className={CSS.lowerText}>PROTEINS</div>
        </div>
      </div>
      <div className={CSS.assignText}>
        You can assign result to your account to control your diet
      </div>
      {session?.user ? (
        <Button
          width="100%"
          height="2.25rem"
          fontSize="18px"
          isDisabled={disabled}
          isLoading={isLoading}
          type="button"
          onClick={() => {
            calculate();
            setDisabled(true);
          }}
        >
          Asign to account
        </Button>
      ) : (
        <Button
          width="100%"
          height="2.25rem"
          fontSize="18px"
          isDisabled={true}
          isLoading={false}
          type="button"
        >
          You must sign in to assign
        </Button>
      )}
    </div>
  );
}
