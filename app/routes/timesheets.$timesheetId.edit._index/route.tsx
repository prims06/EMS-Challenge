import { useEffect, useState } from "react";
import {  redirect, useLoaderData, useParams, type ActionFunction, type LoaderFunctionArgs } from "react-router";
import EmployeeForm from "~/components/form_employee";
import TimesheetForm from "~/components/form_timesheet";
import { getDB } from "~/db/getDB";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = await getDB();
  console.log(params.timesheetId);
  const timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [params.timesheetId]);

  return { timesheet };
};


export default function EditTimesheetPage() {
const { timesheet } = useLoaderData();

 
  const updateTimesheet = async (id: any, formData: any) => {
    try {
      const db = await getDB();
      const idCardPath = await handleFileUpload(formData.id_card);
      const cvPath = await handleFileUpload(formData.cv);


      const query = `
      UPDATE timesheets SET 
        title = ?, start_time = ?, end_time = ?, employee_id = ?
      WHERE id = ?
    `;

      await db.run(query, [
        formData.title, formData.start_time, formData.end_time, formData.employee_id, id
      ])
       
      return redirect("/timesheets");
    } catch (error: any) {
      throw new Error("Failed to update timesheet: " + error.message);
    }
  };

  return (
    <div>
      <TimesheetForm initialData={timesheet} isEditing={true} onSubmit={(formData:any) => {updateTimesheet(timesheet.id, formData)}}  />
    </div>
  );
}
