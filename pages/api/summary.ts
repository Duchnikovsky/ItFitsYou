import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"

interface BodyRequest {
  email: string,
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email }: BodyRequest = req.body

  const nutrients = await prisma.user.findFirst({
    where: {
      email: email,
    },
    select: {
      kcal: true,
      carbohydrate: true,
      fat: true,
      protein: true,
    }
  })
  if (nutrients) {
    return res.send({ type: 1, nutrients: nutrients })
  } else {
    return res.send({ type: 0, message: "An error occured" })
  }
}