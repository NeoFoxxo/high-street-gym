import db from "@/app/utils/database";
import xml2js from "xml2js";

export async function POST(request){

    const classesXML = await request.text();

    try { 
        // parse the xml in the request
        const classSchedule = await xml2js.parseStringPromise(classesXML);

        // loop over all the ClassSchedule elements in the parsed object to get the class schedule details
        classSchedule.ClassSchedules.ClassSchedule.forEach(async (singleClass) => {
          const classID = singleClass.classID[0];
          const startTime = singleClass.startTime[0];
          const endTime = singleClass.endTime[0];

          // insert each class schedule into db
          await db.execute(
            'INSERT INTO class_schedule (class_id, start_time, end_time) VALUES (?, ?, ?)', 
            [classID, startTime, endTime],
          );
          
        });
        console.log("all classes inserted into db from XML successfully");
        return new Response('OK');
    }
    // catch parsing errors
    catch (error) {
      console.log(error)
      return new Response('Error')
    }
}