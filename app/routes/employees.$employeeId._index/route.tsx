import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getDB } from "~/db/getDB";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = await getDB();
  const employee = await db.get("SELECT * FROM employees WHERE id = ?", [params.employeeId]);
  const timesheets = await db.all(
    "SELECT * FROM timesheets WHERE employee_id = ?", [params.employeeId]
  );
  return { employee, timesheets };
};

export default function EmployeePage() {
  const { employee, timesheets } = useLoaderData();
  return (
    <div>
      <div className="p-8 max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg mb-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Employee Profile</h1>
          <Link
            to={`/employees/${employee?.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            Edit
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-y-4 text-sm">
          {employee?.profile && employee?.profile !== "" && employee?.profile !== "null" &&(<><span className="font-bold text-gray-500 uppercase tracking-tight">Profile</span>
          <span><img src={employee?.profile} alt={employee?.full_name} className="w-24 h-24 rounded-full" />{employee?.full_name}</span></>)}
          <span className="font-bold text-gray-500 uppercase tracking-tight">Full Name</span>
          <span>{employee?.full_name}</span>
          <span className="font-bold text-gray-500 uppercase tracking-tight">Email</span>
          <span>{employee?.email}</span>

          <span className="font-bold text-gray-500 uppercase tracking-tight">Phone Number</span>
          <span>{employee?.phone_number}</span>

          <span className="font-bold text-gray-500 uppercase tracking-tight">Date of Birth</span>
          <span>{employee?.date_of_birth}</span>

          <span className="font-bold text-gray-500 uppercase tracking-tight">Job Title</span>
          <span>{employee?.job_title}</span>

          <span className="font-bold text-gray-500 uppercase tracking-tight">Department</span>
          <span>{employee?.departement}</span>

          <span className="font-bold text-gray-500 uppercase tracking-tight">Start Date</span>
          <span>{employee?.start_date}</span>

          <span className="font-bold text-gray-500 uppercase tracking-tight">End Date</span>
          <span>{employee?.end_date ?? "Present"}</span>
        </div>

        <div className="mt-10 space-y-6">
          <div>
            <p className="font-bold text-gray-500 uppercase tracking-tight mb-2">ID Card</p>
            {employee?.id_card && employee?.id_card !== "" && employee?.id_card !== "null" ? (
              <a
                href={employee.id_card}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                View ID Card
              </a>

            ) : (
              <p className="text-gray-400">No document</p>
            )}
          </div>

          <div>
            <p className="font-bold text-gray-500 uppercase tracking-tight mb-2">Resume</p>
            {employee?.cv && employee?.cv !== "" && employee?.cv !== "null" ? (
              <a
                href={employee.cv}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
              >
               
                View CV
              </a>
            ) : (
              <p className="text-gray-400">No document</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg mb-8">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Timesheet List</h1>

        </div>



        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">ID</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Timesheet Title</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Start Time</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">End Time</th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-100">
            {timesheets.map((timesheet: any) => (
              <tr key={timesheet.id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-gray-400">
                  #{timesheet.id}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {timesheet.title}
                </td>

                <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                  {timesheet.start_time}
                </td>
                <td className="px-6 py-4">
                  {timesheet.end_time}

                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to={`/timesheets/${timesheet.id}/edit`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold p-2 rounded-md hover:bg-blue-50"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/timesheets/${timesheet.id}`}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold p-2 rounded-md hover:bg-blue-50"
                  >
                    Details
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  )
}
