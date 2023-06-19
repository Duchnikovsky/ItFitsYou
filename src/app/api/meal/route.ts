import { prisma } from "@/lib/db";

interface BodyRequest{
  email: string,
  day: Date,
}

export async function POST(req:Request){
  const body:BodyRequest = await req.json()
  const newDate = new Date(body.day)
  newDate.setHours(newDate.getHours()+2)

  const meals = await prisma.meals.findMany({
    where: {
      userEmail: body.email,
      day: newDate,
    },
    include: {
      food: true,
    }
  })
  if(meals){
    return new Response(JSON.stringify({type: 1, meals: meals}))
  }else{
    return new Response(JSON.stringify({type: 0}))
  }
}