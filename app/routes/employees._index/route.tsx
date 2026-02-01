import { Form, Link, useLoaderData, useNavigate, useSearchParams, type LoaderFunctionArgs } from "react-router";
import { getDB } from "~/db/getDB"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const db = await getDB();

  const search = url.searchParams.get("search") || "";

  const employees = await db.all(
    "SELECT * FROM employees WHERE full_name LIKE ? OR job_title LIKE ? OR departement LIKE ? LIMIT ? OFFSET ?",
    [`%${search}%`, `%${search}%`, `%${search}%`, limit, offset]
  );

  const { total } = await db.get("SELECT COUNT(*) as total FROM employees WHERE full_name LIKE ? OR job_title LIKE ? OR departement LIKE ?", [`%${search}%`, `%${search}%`, `%${search}%`]);
  const totalPages = Math.ceil(total / limit);

  return { employees, totalPages, total, currentPage: page };
};

export default function EmployeesPage() {
  const { employees, total, totalPages, currentPage } = useLoaderData();
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">

        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div>
            <Form method="get" className="flex gap-2">
              <input
                type="text"
                name="search"
                defaultValue={searchParams.get("search") || ""}
                placeholder="Name, Job Title, Department..."
                className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Search
              </button>

            </Form>
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
              {total} employees
            </div>
            <div className="flex items-center justify-center gap-2 mt-4 py-4">
              <div className="mr-8">
                Show <select defaultValue={'10'} name="limit" onChange={(e) => {
                  searchParams.set('limit', e.target.value)
                  navigate(`?${searchParams.toString()}`)
                }}>
                  <option value="2" selected={searchParams.get('limit') == '2'}>2</option>
                  <option value="5" selected={searchParams.get('limit') == '5'}>5</option>
                  <option value="10" selected={searchParams.get('limit') == '10' || !searchParams.get('limit')}>10</option>
                  <option value="25" selected={searchParams.get('limit') == '25'}>25</option>
                </select>
              </div>
              {pages.map((pageNum) => (
                <a
                  key={pageNum}
                  onClick={
                    () => {
                      searchParams.set('page', pageNum.toString())
                      navigate(`?${searchParams.toString()}`)
                    }

                  }
                  className={`px-3 py-1 border rounded ${currentPage === pageNum
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {pageNum}
                </a>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
