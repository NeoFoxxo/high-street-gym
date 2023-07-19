import db from "@/app/utils/database";
import * as bcrypt from 'bcrypt';

export async function POST(request){

    const body = await request.json();

    // get user from db
    const [user] = await db.execute(`SELECT * FROM user WHERE email = "${body.email}"`);

    // compare the given password to the hashed password in the db
    if (user.length > 0 && (await bcrypt.compare(body.password, user[0].password))){

        // if the password is valid save the entire user row info without the password into a cookie
        const {password, ...userWithoutPass} = user;
        return new Response(JSON.stringify(userWithoutPass));
    }
    else {
        // send null if the sign in is not successfull
        return new Response(JSON.stringify(null));
    }
}