import { prisma } from "@/lib/db"
const bcrypt = require('bcrypt')

interface RequestBody {
  email: string,
  password: string,
}

export async function POST(request:Request, response:Response) {
  const body:RequestBody = await request.json()

  const userExists = await prisma.user.findFirst({
    where: {
      email: body.email,
    }
  })
  
  if(userExists){
    return new Response(JSON.stringify({type: 0, message: 'This email is already taken'}))
  }else{
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
      }
    })
    if(user){
      return new Response(JSON.stringify({type: 1, message: 'Successfully created an account'}))
    }else{
      return new Response(JSON.stringify({type: 0, message: 'An error occured'}))
    }
  }
}