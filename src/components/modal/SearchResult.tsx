import { FoodTypes } from "@/lib/validators/meals";
import CSS from "@/styles/creator.module.css";

interface SearchResult {
  food: FoodTypes;
}
export default function SearchResult({ food }: SearchResult) {
  return <div className={CSS.searchResult}>
    <div className={CSS.resultName}>{food.name}</div>
    <div className={CSS.resultKcal}>{food.kcal} kcal per 100g</div>
  </div>;
}
