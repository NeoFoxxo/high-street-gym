import db from "@/app/utils/database";

export async function GET(){

    try {
        // get class data
        const [classData] = await db.execute(
            `SELECT class_schedule.start_time as startDate, class_schedule.end_time as endDate, classes.name as title, classes.description, classes.image	
            FROM class_schedule
            JOIN classes ON class_schedule.class_id = classes.class_id;`);
        return new Response(JSON.stringify(classData));
    }
    catch (error) {
        return new Response(JSON.stringify(error));
    }
}