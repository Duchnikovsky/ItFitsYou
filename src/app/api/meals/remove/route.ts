import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function DELETE(req: Request) {
  const url = new URL(req.url);

  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("You are not authorized", { status: 401 });
    }

    const { id } = z
      .object({
        id: z.string(),
      })
      .parse({
        id: url.searchParams.get("id"),
      });

    const meal = await db.meals.findFirst({
      where: {
        id: id,
      },
    });

    if (!meal) {
      return new Response("There is not such meal", { status: 411 });
    }

    if (meal?.userId !== session.user.id) {
      return new Response("You are not owner of this directory", {
        status: 401,
      });
    }

    await db.meals.delete({
      where: {
        id: id,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data", { status: 422 });
    }
    return new Response("Could not fetch meals", { status: 500 });
  }
}
