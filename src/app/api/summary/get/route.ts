import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("You are not authorized", { status: 401 });
    }

    const { day } = z
      .object({
        day: z.coerce.date(),
      })
      .parse({
        day: url.searchParams.get("day"),
      });

    const needs = await db.needs.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if(!needs){
      return new Response("Needs are empty", {status: 404})
    }

    return new Response(JSON.stringify(needs));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data", { status: 422 });
    }
    return new Response("Could not fetch meals", { status: 500 });
  }
}
