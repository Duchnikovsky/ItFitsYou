import { FoodTypes } from "@/lib/validators/meals";
import CSS from "@/styles/meals.module.css";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface DishProps {
  dish: FoodTypes;
  refetch: () => void;
}

export default function Dish({ dish, refetch }: DishProps) {
  const { mutate: remove, isLoading } = useMutation({
    mutationFn: async () => {
      const query = `/api/meals/remove?id=${dish.mealId}`;

      const { data } = await axios.delete(query);

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
      toast.info(`You have removed ${dish.name} from list`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return refetch();
    },
  });

  return (
    <div className={CSS.dish}>
      <div className={CSS.dishHeader}>
        <div>
          {dish.name}
          <span className={CSS.dishKcal}> {dish.kcal} kcal</span>
        </div>
        <div className={CSS.dishRemove} onClick={() => remove()}>
          {isLoading ? <Loader2 className={CSS.loader} size={14} /> : <>X</>}
        </div>
      </div>
      <div className={CSS.dishContent}>
        <div className={CSS.dishNutrient}>
          <div className={CSS.dishNutrientKcal}>{dish.carbohydrate}</div>
          <div>Carbohydrates</div>
        </div>
        <div className={CSS.dishNutrient}>
          <div className={CSS.dishNutrientKcal}>{dish.fat}</div>
          <div>Fats</div>
        </div>
        <div className={CSS.dishNutrient}>
          <div className={CSS.dishNutrientKcal}>{dish.protein}</div>
          <div>Proteins</div>
        </div>
      </div>
    </div>
  );
}
