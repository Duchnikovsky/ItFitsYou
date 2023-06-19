import { prisma } from "@/lib/db"

interface RequestBody{
  email: string,
  kcal: number,
  carbohydrate: string,
  fat: string,
  protein: string,
}

export async function POST(req:Request) {
  const body:RequestBody = await req.json()
  const update = await prisma.user.update({
    where: {
      email: body.email,
    },
    data: {
      kcal: body.kcal,
      carbohydrate: body.carbohydrate,
      fat: body.fat,
      protein: body.protein
    }
  })
  
  if(update){
    return new Response(JSON.stringify({type: 1, message: "Successfully applied changes"}))
  }else{
    return new Response(JSON.stringify({type: 0, message: "An error occured"}))
  }
}