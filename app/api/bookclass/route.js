import db from "@/app/utils/database";

export async function POST(request){

    const body = await request.json();
    console.log(body)
    return new Response(JSON.stringify(body));
}