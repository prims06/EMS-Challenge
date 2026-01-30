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
    <div>
      <div>
        <div className="btn-new">
          <a className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 mt-8"><Link to='/employees/new'>+ New</Link></a>
        </div>
        <table className="table-auto">
          <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>Job Title</th>
            <th>Departement</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => (
              <tr>
                <td>#{employee.id}</td>
                <td>{employee.full_name}</td>
                <td>{employee.email}</td>
                <td>{employee.phone_number}</td>
                <td>{employee.job_title}</td>
                <td>{employee.departement}</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  )
}
