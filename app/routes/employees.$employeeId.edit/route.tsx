import { redirect, useLoaderData, useSubmit, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router";
import EmployeeForm from "~/components/form_employee";
import { getDB } from "~/db/getDB";
import { handleFileUpload } from "~/utils/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [params.employeeId]);

  if (!employee) {
    throw new Response("Not Found", { status: 404 });
  }
  return { employee };
};

// L'ACTION : Modifie les données (Côté Serveur)
export const action = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const db = await getDB();
  const idCardPath = await handleFileUpload(formData.get("id_card"));
  const cvPath = await handleFileUpload(formData.get("cv"));
  const query = `
    UPDATE employees SET 
      full_name = ?, email = ?, phone_number = ?, date_of_birth = ?, 
      job_title = ?, departement = ?, start_date = ?, end_date = ?, id_card = ?, cv = ?
    WHERE id = ?
  `;

  await db.run(query, [
    data.full_name, data.email, data.phone_number, data.date_of_birth,
    data.job_title, data.departement, data.start_date, data.end_date,
    idCardPath, cvPath, params.employeeId
  ]);

  return redirect("/employees");
};

export default function EditEmployeePage() {
  const { employee } = useLoaderData();
  const submit = useSubmit();

  const handleOnSubmit = (formData: any) => {
    const fd = new FormData();
    Object.keys(formData).forEach(key => fd.append(key, formData[key]));
    submit(fd, { method: "post" });
  };

  return (
    <div className="py-8">
      <EmployeeForm
        initialData={employee}
        isEditing={true}
        onSubmit={handleOnSubmit}
      />
    </div>
  );
}