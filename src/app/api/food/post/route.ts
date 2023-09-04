import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { MealValidator } from "@/lib/validators/meals";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("You are not authorized", { status: 401 });
    }

    const body = await req.json();
    
    const { id, category, serving } = MealValidator.parse(body);

    if (typeof serving !== "number" || serving < 1) {
      return new Response("Serving size is incorrect", { status: 422 });
    }

    const food = await db.food.findFirst({
      where: {
        id: id,
      },
    });

    if (!food) {
      return new Response("There is no such a food", { status: 404 });
    }

    await db.meals.create({
      data: {
        userId: session.user.id,
        category: category,
        foodId: id,
        serving: serving,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.errors[0].message, { status: 422 });
    }

    return new Response("Could not add a meal, try again later", {
      status: 500,
    });
  }
}
