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

    const newDate = new Date(day);

    const meals = await db.meals.findMany({
      where: {
        userId: session.user.id,
        day: {
          gte: newDate,
          lt: new Date(new Date(newDate).getTime() + 24 * 60 * 60 * 1000),
        },
      },
      include: {
        food: true,
      },
    });

    return new Response(JSON.stringify(meals));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data", { status: 422 });
    }
    return new Response("Could not fetch meals", { status: 500 });
  }
}
