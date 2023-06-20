import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"

interface BodyRequest {
  email: string,
  category: number,
  foodId: string,
  serving: number,
  day: Date,
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, category, foodId, serving, day }: BodyRequest = req.body
  const newDate = new Date(day)
  newDate.setHours(newDate.getHours() + 2)

  const food = await prisma.meals.create({
    data: {
      userEmail: email,
      category: category,
      foodId: foodId,
      serving: serving,
      day: newDate,
    }
  })

  if (food) {
    return res.send({ type: 1 })
  } else {
    return res.send({ type: 0 })
  }
}