import db from "@/app/utils/database";
import * as bcrypt from 'bcrypt';

export async function POST(request){

    const body = await request.json();


    // insert new user into db
    const [user] = await db.execute(
        'INSERT INTO user (username, email, password) VALUES (?, ?, ?)', 
        [body.username, body.email, await bcrypt.hash(body.password, 8)],
    );

    // return the user without their password back
    const {password, ...userWithoutPassword} = user;
    return new Response(JSON.stringify(userWithoutPassword));
}