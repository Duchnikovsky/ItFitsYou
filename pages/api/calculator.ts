import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"

interface BodyRequest {
  email: string,
  kcal: number,
  carbohydrate: string,
  fat: string,
  protein: string,
}


export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, kcal, carbohydrate, fat, protein }: BodyRequest = req.body

  const update = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      kcal: kcal,
      carbohydrate: carbohydrate,
      fat: fat,
      protein: protein
    }
  })

  if (update) {
    return res.send({ type: 1, message: "Successfully applied changes" })
  } else {
    return res.send({ type: 0, message: "An error occured" })
  }
}