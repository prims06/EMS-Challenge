import { Form, redirect, type ActionFunction } from "react-router";
import EmployeeForm from "~/components/form_employee";
import { getDB } from "~/db/getDB";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const full_name = formData.get("full_name");

  const db = await getDB();
  await db.run(
    'UPDATE employees SET full_name = ? WHERE id = ?',
    [full_name, formData.get("id")]
  );

  return redirect("/employees");
}

export default function EditEmployeePage() {



  return (
    <div>
        <EmployeeForm initialData={{  }} isEditing={true} />
    </div>
  );
}
