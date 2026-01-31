import { useLoaderData, redirect, useSubmit } from "react-router";
import { getDB } from "~/db/getDB";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import TimesheetForm from "~/components/form_timesheet";

export async function loader({ }: LoaderFunctionArgs) {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const employee_id = formData.get("employee_id");
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time");
  const title = formData.get("title");

  const db = await getDB();
  await db.run(
    'INSERT INTO timesheets (employee_id, start_time, end_time, title) VALUES (?, ?, ?, ?)',
    [employee_id, start_time, end_time, title]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees } = useLoaderData();
  const submit = useSubmit();

  const handleOnSubmit = (formData: any) => {
    const fd = new FormData();
    Object.keys(formData).forEach((key) => fd.append(key, formData[key]));

    submit(fd, { method: "post" });
  };

  return (
    <div className="py-8">
      

      <TimesheetForm
        initialData={null}
        employees={employees}
        isEditing={false}
        onSubmit={handleOnSubmit}
      />
    </div>
  );
}