"use client";

import CSS from "@/styles/summary.module.css";
import { useQuery } from "@tanstack/react-query";
import { DayContext } from "@/components/LeftPanel";
import { useContext, useState } from "react";
import axios from "axios";
import { NeedsTypes } from "@/lib/validators/needs";
import { Loader2 } from "lucide-react";
import ProgressBar from "@/components/ui/Progressbar";

interface SummaryProps {
  values: number[];
}

export default function Summary({ values }: SummaryProps) {
  const day = useContext(DayContext);
  const [result, setResult] = useState<boolean>(false);
  const [goals, setGoals] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  const { data, refetch, isFetching, isFetched } = useQuery({
    queryKey: ["summary-query"],
    queryFn: async () => {
      const query = `/api/summary/get?day=${day}`;

      const { data } = await axios.get(query);

      return data as NeedsTypes;
    },
    onError: (error) => {
      setResult(false);
    },
    onSuccess: (data) => {
      setResult(true);
      const kcal = data.kcal;
      const carbo = data.carbohydrate.split(",");
      const fat = data.fat.split(",");
      const protein = data.protein.split(",");
      setGoals([
        kcal,
        parseInt(carbo[0]),
        parseInt(carbo[1]),
        parseInt(fat[0]),
        parseInt(fat[1]),
        parseInt(protein[0]),
        parseInt(protein[1]),
      ]);
    },
    enabled: true,
    refetchOnWindowFocus: false,
    retry: false,
  });

  if (isFetching) {
    return (
      <div>
        <div className={CSS.header}>Summary</div>
        <div className={CSS.main}>
          <Loader2 className={CSS.loader} />
        </div>
      </div>
    );
  }

  return (
    <div>
      {result && isFetched ? (
        <div className={CSS.main}>
          <div className={CSS.header}>Summary</div>
          <div className={CSS.kcalArea}>
            <div className={CSS.needHeader}>CALORIES</div>
            <ProgressBar
              value={values[0]}
              maxValue={goals[0]}
              text={`${goals[0]}`}
            />
          </div>
          <div className={CSS.needsArea}>
            <div className={CSS.needsSide}>
              <div className={CSS.needHeader}>CARBOHYDRATES</div>
              <ProgressBar
                value={values[1]}
                maxValue={goals[1]}
                text={`${goals[1]}-${goals[2]}`}
              />
            </div>
            <div className={CSS.needsCenter}>
              <div className={CSS.needHeader}>FATS</div>
              <ProgressBar
                value={values[2]}
                maxValue={goals[3]}
                text={`${goals[3]}-${goals[4]}`}
              />
            </div>
            <div className={CSS.needsSide}>
              <div className={CSS.needHeader}>PROTEINS</div>
              <ProgressBar
                value={values[3]}
                maxValue={goals[5]}
                text={`${goals[5]}-${goals[6]}`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className={CSS.main}>
          <div className={CSS.noNeeds}>
            Use calculator to set up your caloric needs
          </div>
        </div>
      )}
    </div>
  );
}
