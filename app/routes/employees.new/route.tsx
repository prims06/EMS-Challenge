import EmployeeForm from "~/components/form_employee";
import { redirect, useSubmit, type ActionFunctionArgs } from "react-router";
import { getDB } from "~/db/getDB";



export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const db = await getDB();

  const query = `
    INSERT INTO employees (
      full_name, email, phone_number, date_of_birth, 
      job_title, departement, start_date, end_date, 
      id_card, cv, profile
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await db.run(query, [
    data.full_name, data.email, data.phone_number, data.date_of_birth,
    data.job_title, data.departement, data.start_date, data.end_date,
    data.id_card, data.cv, data.profile
  ]);

  return redirect("/employees");
};

export default function NewEmployeePage() {
  const submit = useSubmit();

  const handleOnSubmit = (formData: any) => {
    const fd = new FormData();
    Object.keys(formData).forEach(key => fd.append(key, formData[key]));
    submit(fd, { method: "post" });
  };

  return (
    <div className="py-8">
      <EmployeeForm
        isEditing={false}
        onSubmit={handleOnSubmit}
      />
    </div>
  );
}