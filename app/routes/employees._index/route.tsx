import { Link, useLoaderData } from "react-router"
import { getDB } from "~/db/getDB"

export async function loader() {
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;")

  return { employees }
}

export default function EmployeesPage() {
  const { employees } = useLoaderData()
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">

        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Link
            to="/employees/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm gap-2"
          >
            +
            New
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Full Name</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Email</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Phone Number</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Job Title</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Department</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {employees.map((employee: any) => (
                <tr key={employee.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-gray-400">
                    #{employee.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {employee.full_name}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700">{employee.email}</div>

                  </td>
                  <td className="px-6 py-4">

                    <div className="text-xs">{employee.phone_number}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                    {employee.job_title}
                  </td>
                  <td className="px-6 py-4">
                      {employee.departement}
                  
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/employees/${employee.id}/edit`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold p-2 rounded-md hover:bg-blue-50"
                    >
                      Edit
                    </Link>
                    <Link
                      to={`/employees/${employee.id}`}
                      className="text-blue-600 hover:text-blue-800 text-sm font-semibold p-2 rounded-md hover:bg-blue-50"
                    >
                      Details
                    </Link>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="text-sm">
              {employees.length} employees
            </div>
            
          </div>
        </div>


      </div>
    </div>
  )
}
