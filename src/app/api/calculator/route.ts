import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { AsignValidator } from "@/lib/validators/calculator";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return new Response("You are not authorized", { status: 401 });
    }

    const body = await req.json();

    const { kcal, lowC, highC, lowF, highF, lowP, highP } =
      AsignValidator.parse(body);

    const needs = await db.needs.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    if (needs) {
      await db.needs.update({
        where: {
          userId: session.user.id,
        },
        data: {
          kcal: kcal,
          carbohydrate: `${lowC},${highC}`,
          fat: `${lowF},${highF}`,
          protein: `${lowP},${highP}`,
        },
      });
    } else {
      await db.needs.create({
        data: {
          userId: session.user.id,
          kcal: kcal,
          carbohydrate: `${lowC},${highC}`,
          fat: `${lowF},${highF}`,
          protein: `${lowP},${highP}`,
        },
      });
    }

    return new Response("ok");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return new Response(error.errors[0].message, { status: 411 });
    }

    return new Response("Could not assign data, try again later", {
      status: 500,
    });
  }
}
