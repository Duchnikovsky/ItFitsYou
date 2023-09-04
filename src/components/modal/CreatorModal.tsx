"use client";
import MODAL from "@/styles/modal.module.css";
import CSS from "@/styles/creator.module.css";
import { Input } from "../ui/Input";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import debounce from "lodash.debounce";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FoodTypes, MealTypes } from "@/lib/validators/meals";
import SearchResult from "@/components/modal/SearchResult";
import FoodDetails from "@/components/FoodDetails";

interface CreatorModalProps {
  category: string;
  toggleModal: (bool: boolean) => void;
  meal: MealTypes;
}

export default function CreatorModal({
  category,
  toggleModal,
  meal,
}: CreatorModalProps) {
  const [value, setValue] = useState<string>("");
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const { data, refetch } = useQuery({
    queryKey: ["food-search"],
    queryFn: async () => {
      const query = `/api/food/get?query=${value}`;

      const { data } = await axios.get(query);

      return data;
    },
    enabled: true,
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const food = data?.flatMap((food: MealTypes) => food) || [] || [];

  return (
    <div className={MODAL.background}>
      {selected === undefined ? (
        <div className={CSS.main}>
          <div className={CSS.upperText}>
            Add a meal to <b>{category}</b> category
          </div>
          <div className={CSS.searchBar}>
            <Input
              type={"text"}
              maxLength={16}
              isDisabled={false}
              width="75%"
              height="2.75rem"
              fontSize="16px"
              spellCheck={false}
              placeholder="Search for food"
              margin={"auto"}
              icon={
                <Search
                  stroke="black"
                  strokeWidth={1.5}
                  size={22}
                  style={{ paddingTop: "0.25rem" }}
                />
              }
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                debounceRequest();
              }}
            />
          </div>
          {food.length > 0 && (
            <div className={CSS.searchResults}>
              {food.map((food: FoodTypes) => (
                <div
                  className={CSS.foodContainer}
                  onClick={() => setSelected(food.id)}
                  key={food.id}
                >
                  <SearchResult food={food} />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={CSS.main}>
          <FoodDetails
            foodId={selected}
            category={category}
            categoryId={meal.id}
            toggleModal={(bool: boolean) => toggleModal(bool)}
          />
        </div>
      )}
    </div>
  );
}
