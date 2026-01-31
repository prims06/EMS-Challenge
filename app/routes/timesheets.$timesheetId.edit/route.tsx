import { redirect, useLoaderData, useSubmit, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import TimesheetForm from "~/components/form_timesheet";
import { getDB } from "~/db/getDB";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = await getDB();
  
  const timesheet = await db.get("SELECT * FROM timesheets WHERE id = ?", [params.timesheetId]);
  const employees = await db.all("SELECT id, full_name FROM employees");

  if (!timesheet) {
    throw new Response("Timesheet Not Found", { status: 404 });
  }

  return { timesheet, employees };
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const employee_id = formData.get("employee_id");

  const db = await getDB();
  const query = `
    UPDATE timesheets SET 
      title = ?, start_time = ?, end_time = ?, employee_id = ?
    WHERE id = ?
  `;

  await db.run(query, [title, start_time, end_time, employee_id, params.timesheetId]);

  return redirect("/timesheets");
};

export default function EditTimesheetPage() {
  const { timesheet, employees } = useLoaderData();
  const submit = useSubmit();

  const handleOnSubmit = (formData: any) => {
    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));
    
    submit(fd, { method: "post" });
  };

  return (
    <div className="py-8">
      <TimesheetForm 
        initialData={timesheet} 
        employees={employees} 
        isEditing={true} 
        onSubmit={handleOnSubmit} 
      />
    </div>
  );
}