import { Link, useLoaderData, useNavigate, useSearchParams, type LoaderFunctionArgs } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";
import CalendarComponent from "~/components/calendar";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 10;
  const employeeId = Number(url.searchParams.get("employee"));
  const offset = (page - 1) * limit;
  const db = await getDB();
  const timesheetsAndEmployees = await (employeeId ? db.all(
    `SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id AND timesheets.employee_id = ? LIMIT ? OFFSET ?`, [employeeId, limit, offset]
  ) : db.all(
    `SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id LIMIT ? OFFSET ?`, [limit, offset]
  ));
  const employees = await db.all('SELECT id, full_name FROM employees');
  const { total } = await (employeeId ? db.get("SELECT COUNT(*) as total FROM timesheets JOIN employees ON timesheets.employee_id = employees.id WHERE employee_id = ?", [employeeId]) : db.get("SELECT COUNT(*) as total FROM timesheets"));
  const totalPages = Math.ceil(total / limit);

  return { timesheetsAndEmployees, employees, totalPages, total, currentPage: page };

}

export default function TimesheetsPage() {

  const { timesheetsAndEmployees, employees, total, totalPages, currentPage } = useLoaderData();
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [isCalendarView, setCalendarView] = useState(false)
  return (

    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">

        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="space-x-4">
            <button className={`cursor-pointer ${isCalendarView ? 'text-gray-500' : 'text-blue-400'}`} onClick={() => {
              setCalendarView(false)
            }}>Table View</button>
            <button className={`cursor-pointer ${!isCalendarView ? 'text-gray-500' : 'text-blue-400'}`} onClick={() => {
              setCalendarView(true)
            }}>Calendar View</button>
          </div>
          <select
            required
            defaultValue={''}
            name="employee_id"
            value={searchParams.get('employee') ?? ''}
            onChange={(e) => {
              searchParams.set('employee', e.target.value)
              navigate(`?${searchParams.toString()}`)
            }}
            className="w-min px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white transition-all"
          >
            <option value="">Filter employee</option>
            {employees.map((emp: any) => (
              <option key={emp.id} value={emp.id}>
                {emp.full_name}
              </option>
            ))}
          </select>

          <Link
            to="/timesheets/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm gap-2"
          >
            +
            New
          </Link>
        </div>

        {!isCalendarView ? (<div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">ID</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Employee</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Timesheet Title</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">Start Time</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b">End Time</th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 border-b text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {timesheetsAndEmployees.map((timesheet: any) => (
                <tr key={timesheet.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-gray-400">
                    #{timesheet.id}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {timesheet.full_name}
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
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="text-sm">
              {total} timesheets
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
        </div>)
          : (
            <CalendarComponent timesheets={timesheetsAndEmployees} />
          )}


      </div>
    </div >

  );
}
