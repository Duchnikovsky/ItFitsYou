import { prisma } from "@/lib/db"

interface RequestBody{
  email: string,
}

export async function POST(req:Request) {
  const body:RequestBody = await req.json()
  const nutrients = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
    select: {
      kcal: true,
      carbohydrate: true,
      fat: true,
      protein: true,
    }
  })
  if(nutrients){
    return new Response(JSON.stringify({type: 1, nutrients: nutrients}))
  }else{
    return new Response(JSON.stringify({type: 0, message: "An error occured"}))
  }
}