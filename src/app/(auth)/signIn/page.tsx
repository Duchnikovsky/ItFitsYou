import SignIn from "@/components/auth/SignIn";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getAuthSession();

    if (session) {
      redirect("/")
    }

    return <SignIn />;
}
