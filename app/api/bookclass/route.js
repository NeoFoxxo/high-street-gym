import db from "@/app/utils/database";

export async function POST(request){

    const body = await request.json();

    // insert booking info into the bookings table
    const [result] = await db.execute(
        'INSERT INTO bookings (user_id, class_schedule_id, trainer_id) VALUES (?, ?, ?)', 
        [body.userid, body.classid, body.trainer],
    );
    console.log(`Class ${body.classid} successfully booked for user ${body.userid} with trainer ${body.trainer}`)
    return new Response(JSON.stringify(result));
}