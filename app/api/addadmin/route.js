import db from "@/app/utils/database";
import xml2js from "xml2js";
import * as bcrypt from 'bcrypt';

export async function POST(request){

    const adminXML = await request.text();

    try { 
        // parse the xml in the request
        const adminUser = await xml2js.parseStringPromise(adminXML);
        const email = adminUser.AdminUser.email[0];
        const username = adminUser.AdminUser.username[0];
        const password = adminUser.AdminUser.password[0];

        // insert the new admin user into the db
        await db.execute(
          'INSERT INTO user (user_role, email, username, password) VALUES (?, ?, ?, ?)', 
          [1, email, username, await bcrypt.hash(password, 8)],
        );
        console.log(`new admin user ${username} inserted into db from XML successfully`);
        return new Response('OK');
    }
    // catch parsing errors
    catch (error) {
      console.log(error)
      return new Response('Error')
    }
}