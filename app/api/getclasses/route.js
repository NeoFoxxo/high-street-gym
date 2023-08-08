import db from "@/app/utils/database";

export const revalidate = 0 // dont cache this data

export async function GET(){

    try {
        // get class data
        const [classData] = await db.execute(
            `SELECT class_schedule.start_time as startDate, class_schedule.end_time as endDate, classes.name as title, classes.description, classes.image, class_schedule.class_schedule_id, GROUP_CONCAT(trainers.name) as trainers, GROUP_CONCAT(trainers.trainer_id) as trainer_id
            FROM class_schedule
            JOIN classes ON class_schedule.class_id = classes.class_id
            JOIN trainers ON classes.class_id = trainers.class_id
            GROUP BY class_schedule.class_schedule_id;`);
        return new Response(JSON.stringify(classData));
    }
    catch (error) {
        return new Response(JSON.stringify(error));
    }
}