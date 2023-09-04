import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  const url = new URL(req.url);

  try {
    const { id} = z.object({
      id: z.string()
    }).parse({
      id: url.searchParams.get('id')
    })

    const food = await db.food.findFirst({
      where: {
        id: id,
      }
    })

    return new Response(JSON.stringify(food))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid data", { status: 422 });
    }

    return new Response("Could not fetch details, try again later", {
      status: 500,
    });
  }
}
