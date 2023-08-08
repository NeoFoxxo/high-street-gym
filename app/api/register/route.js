import db from "@/app/utils/database";
import * as bcrypt from 'bcrypt';

export async function POST(request){

    const body = await request.json();

    try {
      // insert new user into db
      const [user] = await db.execute(
          'INSERT INTO user (username, email, password) VALUES (?, ?, ?)', 
          [body.username, body.email, await bcrypt.hash(body.password, 8)],
      );

      return new Response("OK");
    }
    catch (error) {
      console.log(error)
      return new Response("Error");
    }
}