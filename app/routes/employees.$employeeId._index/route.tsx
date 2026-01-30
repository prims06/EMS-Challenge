import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getDB } from "~/db/getDB";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [params.employeeId]);

  return { employee };
};

export default function EmployeePage() {
  const { employee } = useLoaderData();
  return (
    <div className="p-8 max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Employee Profile</h1>
        <Link
          to={`/employees/${employee.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
        >
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <span className="font-bold text-gray-500 uppercase tracking-tight">Full Name</span>
        <span>{employee.full_name}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Email</span>
        <span>{employee.email}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Phone Number</span>
        <span>{employee.phone_number}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Date of Birth</span>
        <span>{employee.date_of_birth}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Job Title</span>
        <span>{employee.job_title}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Department</span>
        <span>{employee.departement}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Start Date</span>
        <span>{employee.start_date}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">End Date</span>
        <span>{employee.end_date || "Present"}</span>
      </div>

      <div className="mt-10 space-y-6">
        <div>
          <p className="font-bold text-gray-500 uppercase tracking-tight mb-2">ID Card</p>
          {employee.id_card ? (
            <img
              src={employee.id_card}
              alt="ID Card"
              className="w-full h-auto border border-gray-100 rounded shadow-sm"
            />
          ) : (
            <p className="text-gray-400">No document</p>
          )}
        </div>

        <div>
          <p className="font-bold text-gray-500 uppercase tracking-tight mb-2">Resume</p>
          {employee.cv ? (
            <img
              src={employee.cv}
              alt="CV"
              className="w-full h-auto border border-gray-100 rounded shadow-sm"
            />
          ) : (
            <p className="text-gray-400">No document</p>
          )}
        </div>
      </div>
    </div>
  )
}
