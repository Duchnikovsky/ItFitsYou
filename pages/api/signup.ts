import { NextApiRequest, NextApiResponse } from "next"
import { z } from "zod"
import { prisma } from "../../lib/db"
import bcrypt from 'bcrypt'

const signupSchema = z.object({
  email: z.string().regex(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g, 'Invalid email'),
  password: z.string().min(5, 'Password invalid'),
})

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = signupSchema.parse(req.body)

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    }
  })

  if(user !== null){
    return res.send({type: 0, message: "This email is taken"})
  }

  const hashedPass = await bcrypt.hash(password, 10)

  const newUser = await prisma.user.create({
    data: {
      email: email,
      password: hashedPass,
    }
  })

  if (newUser) {
    return res.send({ type: 1, user: newUser, message: "User created successfully" })
  } else {
    return res.send({ type: 0, message: "An error occured" })
  }
}