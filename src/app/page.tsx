import Header from "@/components/Header";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CSS from '@/styles/home.module.css'

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/signIn");
  }

  return <div className={CSS.main}>
    <Header />
  </div>;
}
