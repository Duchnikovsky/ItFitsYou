import { prisma } from "@/lib/db"

interface BodyRequest{
  mealId: string,
}

export async function POST(req:Request){
  const body:BodyRequest = await req.json()
  const remove = await prisma.meals.delete({
    where: {
      id: body.mealId,
    },
  })

  if(remove){
    return new Response(JSON.stringify({type: 1}))
  }else{
    return new Response(JSON.stringify({type: 0, message: "An error occured"}))
  }
}