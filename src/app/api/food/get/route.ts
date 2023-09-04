import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const { query } = z
      .object({
        query: z.string(),
      })
      .parse({
        query: url.searchParams.get("query"),
      });

    const food = await db.food.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: {
        name: 'desc',
      }
    });

    return new Response(JSON.stringify(food));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Wrong data input", { status: 422 });
    }

    return new Response("Could not fetch food, try again later", {
      status: 500,
    });
  }
}
