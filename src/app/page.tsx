import PreviousMeals from "@/components/RecentMeals";
import style from "./Home.module.css";
import Header from "@/components/Header";

export default async function Home() {
    return (
        <div className={style.layout}>
            <Header />
            <PreviousMeals />
        </div>
    );
}
