import SignUp from "@/components/auth/SignUp";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
    const session = await getAuthSession();

    if (session) {
        redirect("/");
    }

    return <SignUp />;
}
