import { useEffect, useState } from "react";
import {  redirect, useLoaderData, useParams, type ActionFunction, type LoaderFunctionArgs } from "react-router";
import EmployeeForm from "~/components/form_employee";
import { getDB } from "~/db/getDB";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = await getDB();
  console.log(params.employeeId);
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [params.employeeId]);

  return { employee };
};


export default function EditEmployeePage() {
const { employee } = useLoaderData();

 
  const updateEmployee = async (id: any, formData: any) => {
    try {
      const db = await getDB();
      const idCardPath = await handleFileUpload(formData.id_card);
      const cvPath = await handleFileUpload(formData.cv);


      const query = `
      UPDATE employees SET 
        full_name = ?, email = ?, phone_number = ?, date_of_birth = ?, 
        job_title = ?, departement = ?, start_date = ?, end_date = ?, 
        id_card = ?, cv = ?
      WHERE id = ?
    `;

      await db.run(query, [
        formData.full_name, formData.email, formData.phone_number, formData.date_of_birth,
        formData.job_title, formData.departement, formData.start_date, formData.end_date,
        idCardPath, cvPath, id
      ])
      return redirect("/employees");
    } catch (error: any) {
      throw new Error("Failed to update employee: " + error.message);
    }
  };

  return (
    <div>
      <EmployeeForm initialData={employee} isEditing={true} onSubmit={(formData:any) => {updateEmployee(employee.id, formData)}}  />
    </div>
  );
}
