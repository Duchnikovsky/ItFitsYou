import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"

interface BodyRequest {
  email: string,
  day: Date,
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, day }: BodyRequest = req.body
  const newDate = new Date(day)
  newDate.setHours(newDate.getHours() + 2)

  const meals = await prisma.meals.findMany({
    where: {
      userEmail: email,
      day: newDate,
    },
    include: {
      food: true,
    }
  })

  if (meals) {
    return res.send({ type: 1, meals: meals })
  } else {
    return res.send({ type: 0 })
  }
}