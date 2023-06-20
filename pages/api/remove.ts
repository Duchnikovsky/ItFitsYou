import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"

interface BodyRequest {
  mealId: string,
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { mealId }: BodyRequest = req.body

  const remove = await prisma.meals.delete({
    where: {
      id: mealId,
    },
  })

  if (remove) {
    return res.send({ type: 1 })
  } else {
    return res.send({ type: 0, message: 'An error occured' })
  }
}