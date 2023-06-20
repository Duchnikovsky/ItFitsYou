import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../lib/db"
import bcrypt from 'bcrypt'

interface BodyRequest {
  email: string,
  password: string,
}

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password }: BodyRequest = req.body

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    }
  })

  if (user !== null) {
    return res.send({ type: 0, message: "This email is taken" })
  }

  const hashedPass = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPass,
    }
  })

  if (newUser) {
    return res.send({ type: 1, message: "User created successfully" })
  } else {
    return res.send({ type: 0, message: "An error occured" })
  }
}