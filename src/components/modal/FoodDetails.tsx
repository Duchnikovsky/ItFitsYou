"use client";
import { FoodDetailsTypes, MealAddRequest } from "@/lib/validators/meals";
import CREATORCSS from "@/styles/creator.module.css";
import CSS from "@/styles/details.module.css";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Calculator, Circle, Loader2, Undo2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { AddButton } from "@/components/ui/Button";
import { toast } from "react-toastify";
import { DayContext } from "../LeftPanel";

interface FoodDetailsProps {
  foodId: string;
  category: string;
  toggleModal: (bool: boolean) => void;
  categoryId: number;
  undo: () => void;
}

export default function FoodDetails({
  foodId,
  category,
  toggleModal,
  categoryId,
  undo,
}: FoodDetailsProps) {
  const [serving, setServing] = useState<number | undefined>();

  const day = useContext(DayContext);

  const { refetch, data, isLoading, isFetched } = useQuery({
    queryKey: ["food-details-query"],
    queryFn: async () => {
      const query = `/api/food/details?id=${foodId}`;

      const { data } = await axios.get(query);

      return data as FoodDetailsTypes;
    },
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, [foodId]);

  const { mutate: addMeal, isLoading: isAddLoading } = useMutation({
    mutationFn: async () => {
      const newDate = new Date(day);
      newDate.setHours(newDate.getHours() + 2);
      const payload: MealAddRequest = {
        id: foodId,
        category: categoryId,
        serving: serving,
        day: newDate,
      };

      const { data } = await axios.post(`/api/food/post`, payload);

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
      toast.success("You have successfully added meal", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      return toggleModal(false);
    },
  });

  if (isLoading || !isFetched)
    return (
      <div>
        <div
          className={CREATORCSS.upperText}
          onClick={(e) => e.stopPropagation()}
        >
          Add a meal <b>{category}</b> category
        </div>
        <div
          className={CREATORCSS.loaderArea}
          onClick={(e) => e.stopPropagation()}
        >
          <Circle className={CREATORCSS.loaderTrail} size={34} />
          <Loader2 className={CREATORCSS.loader} size={38} />
        </div>
      </div>
    );

  return (
    <div style={{ height: "100%" }}>
      <div
        className={CREATORCSS.upperText}
        onClick={(e) => e.stopPropagation()}
      >
        Add a meal to <b>{category}</b> category
      </div>
      <div className={CSS.main}>
        <div className={CSS.name} onClick={(e) => e.stopPropagation()}>
          {data?.name}
        </div>
        <div
          className={CSS.nutrientsPer100}
          onClick={(e) => e.stopPropagation()}
        >
          Nutritional values for <b>100g</b> of the product:
        </div>
        <div className={CSS.kcalPer100} onClick={(e) => e.stopPropagation()}>
          <div>
            <b>{data?.kcal}</b>
          </div>
          <div className={CSS.lowerText}>CALORIES</div>
        </div>
        <div className={CSS.nutrientsArea} onClick={(e) => e.stopPropagation()}>
          <div className={CSS.sideNutrientArea}>
            <div className={CSS.nutrionName}>
              <b>{data?.carbohydrate}</b>
            </div>
            <div className={CSS.lowerText}>CARBOHYDRATES</div>
          </div>
          <div className={CSS.centerNutrientArea}>
            <div className={CSS.nutrionName}>
              <b>{data?.fat}</b>
            </div>
            <div className={CSS.lowerText}>FATS</div>
          </div>
          <div className={CSS.sideNutrientArea}>
            <div className={CSS.nutrionName}>
              <b>{data?.protein}</b>
            </div>
            <div className={CSS.lowerText}>PROTEIN</div>
          </div>
        </div>
        <div className={CSS.servingSize} onClick={(e) => e.stopPropagation()}>
          Enter serving size(in grams)
        </div>
        <Input
          width="6rem"
          height="2rem"
          fontSize="15px"
          type="number"
          pattern={"^[0-9]{1,4}$"}
          maxLength={4}
          value={serving}
          onChange={(e) => {
            if (e.target.value === "") {
              setServing(undefined);
            } else {
              setServing(Number(e.target.value));
            }
          }}
          onClick={(e) => e.stopPropagation()}
          icon={
            <Calculator
              stroke="black"
              strokeWidth={1.5}
              size={20}
              style={{ paddingTop: "0.25rem" }}
            />
          }
          isDisabled={false}
          margin={"auto"}
        />
        <div className={CSS.servingResult} onClick={(e) => e.stopPropagation()}>
          <div>
            {serving !== undefined ? (
              <b>
                {serving > 0 ? Math.ceil(serving * (data?.kcal! / 100)) : 0}
              </b>
            ) : (
              <b>0</b>
            )}
          </div>
          <div className={CSS.lowerText}>CALORIES IN SERVING</div>
        </div>
        <AddButton
          isDisabled={false}
          isLoading={isAddLoading}
          margin={"auto"}
          onClick={(e) => {
            addMeal();
            e.stopPropagation();
          }}
        >
          +
        </AddButton>
        <AddButton
          isDisabled={false}
          isLoading={false}
          margin={"1rem auto 0"}
          onClick={(e) => {
            undo()
            e.stopPropagation();
          }}
        >
          <Undo2 />
        </AddButton>
      </div>
    </div>
  );
}
