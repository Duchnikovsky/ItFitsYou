import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"

interface BodyRequest {
  searchValue: string,
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { searchValue }: BodyRequest = req.body

  const search = await prisma.food.findMany({
    where: {
      name: { contains: searchValue }
    },
  })

  if (search) {
    return res.send({ food: search })
  } else {
    return res.send({ food: null })
  }
}