import { prisma } from "@/lib/db"

interface BodyRequest{
  searchValue: string,
}

export async function POST(req:Request){
  const body:BodyRequest = await req.json()
  
  const search = await prisma.food.findMany({
    where: {
      name: {contains: body.searchValue}
    },
  })

  if(search){
    return new Response(JSON.stringify({food: search}))
  }else{
    return new Response(JSON.stringify({food: null}))
  }

}