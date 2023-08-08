import db from "@/app/utils/database";

export async function POST(request){

    const body = await request.json();

    try {
        // insert blog post into the posts table
        const [result] = await db.execute(
            'INSERT INTO blog_posts (user_id, title, article) VALUES (?, ?, ?)', 
            [body.userid, body.title, body.article],
        );
        return new Response(JSON.stringify(result));
    }
    catch (error) {
        console.log(error)
        return new Resonse("Error")
    }
}