import { Link, useLoaderData, type LoaderFunctionArgs } from "react-router";
import { getDB } from "~/db/getDB";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const db = await getDB();
  const timesheet = await db.get(
    `SELECT timesheets.*, employees.full_name, employees.email 
     FROM timesheets 
     JOIN employees ON timesheets.employee_id = employees.id 
     WHERE timesheets.id = ?`,
    [params.timesheetId]
  );

  

  return { timesheet };
};
export default function TimesheetPage() {
 const { timesheet } = useLoaderData();

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">Timesheet Details</h1>
        <Link 
          to={`/timesheets/${timesheet.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
        >
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-sm">
        <span className="font-bold text-gray-500 uppercase tracking-tight">Title</span>
        <span>{timesheet.title || "No Title"}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Employee</span>
        <Link to={`/employees/${timesheet.employee_id}`} className="text-blue-600 hover:underline font-medium">
          {timesheet.full_name}
        </Link>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Employee Email</span>
        <span>{timesheet.email}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">Start Time</span>
        <span>{new Date(timesheet.start_time).toLocaleString()}</span>

        <span className="font-bold text-gray-500 uppercase tracking-tight">End Time</span>
        <span>{new Date(timesheet.end_time).toLocaleString()}</span>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-100">
        <Link 
          to="/timesheets" 
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          ← Back to Timesheets
        </Link>
      </div>
    </div>
  )
}
