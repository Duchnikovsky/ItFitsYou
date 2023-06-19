import { prisma } from "@/lib/db";

interface BodyRequest {
  email: string,
  category: number,
  foodId: string,
  serving: number,
  day: Date,
}

export async function POST(req: Request) {
  const body: BodyRequest = await req.json()
  const newDate = new Date(body.day)
  newDate.setHours(newDate.getHours()+2)

  const food = await prisma.meals.create({
    data: {
      userEmail: body.email,
      category: body.category,
      foodId: body.foodId,
      serving: body.serving,
      day: newDate,
    }
  })

  if (food) {
    return new Response(JSON.stringify({ type: 1 }))
  } else {
    return new Response(JSON.stringify({ type: 0 }))
  }
}