import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
    const url = new URL(req.url);

    try {
        const session = await getAuthSession();

        if (!session?.user) {
            return new Response(
                JSON.stringify({ message: "You are not authorized" }),
                {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const { day } = z
            .object({
                day: z.coerce.date(),
            })
            .parse({
                day: url.searchParams.get("day"),
            });

        const newDate = new Date(day);
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const date = newDate.getDate();
        const startOfDay = new Date(Date.UTC(year, month, date, 0, 0, 0));

        const meals = await db.meals.findMany({
            where: {
                userId: session.user.id,
                day: {
                    gte: startOfDay,
                    lt: new Date(
                        new Date(startOfDay).getTime() + 24 * 60 * 60 * 1000
                    ),
                },
            },
            include: {
                food: true,
            },
        });

        return new Response(JSON.stringify(meals), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(
                JSON.stringify({ message: error.errors[0].message }),
                {
                    status: 422,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        return new Response(
            JSON.stringify({ message: "Server error. Try again later." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
