import Header from "@/components/Header";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CSS from '@/styles/home.module.css'
import LeftPanel from "@/components/LeftPanel";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/signIn");
  }

  return <div className={CSS.main}>
    <Header />
    <div className={CSS.body}>
      <LeftPanel />
      <div>aa</div>
    </div>
  </div>;
}
