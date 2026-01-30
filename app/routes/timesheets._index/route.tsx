import { Link, useLoaderData } from "react-router";
import { useState } from "react";
import { getDB } from "~/db/getDB";

export async function loader() {
  const db = await getDB();
  const timesheetsAndEmployees = await db.all(
    "SELECT timesheets.*, employees.full_name, employees.id AS employee_id FROM timesheets JOIN employees ON timesheets.employee_id = employees.id"
  );

  return { timesheetsAndEmployees };
}

export default function TimesheetsPage() {
  const { timesheetsAndEmployees } = useLoaderData();
  const [isCalendarView, setCalendarView] = useState(false)
  return (
    
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border border-gray-200">

        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="space-x-4">
        <button onClick={() => {
          setCalendarView(false)
        }}>Table View</button>
        <button onClick={() => {
          setCalendarView(true)
        }}>Calendar View</button>
        </div>
          <Link
            to="/timesheets/new"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm gap-2"
          >
            +
            New
          </Link>
        </div>

       {!isCalendarView ? ( <div className="overflow-x-auto">
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
                      Modifier
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
              {timesheetsAndEmployees.length} timesheets
            </div>
            
          </div>
        </div>)
        : (
        <div>
          <p>
            To implement, see <a href="https://schedule-x.dev/docs/frameworks/react">Schedule X React documentation</a>.
          </p>
        </div>
      )}


      </div>
    </div>
    
  );
}
