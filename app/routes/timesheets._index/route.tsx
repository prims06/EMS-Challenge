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
    <div>
      
        <div className="btn-list">
          <div>
        <button onClick={() => {
          setCalendarView(false)
        }}>Table View</button>
        <button onClick={() => {
          setCalendarView(true)
        }}>Calendar View</button>
        </div>
          <a className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md shadow-blue-200 mt-8"><Link to='/employees/new'>+ New</Link></a>
        </div>
      
      {/* Replace `true` by a variable that is changed when the view buttons are clicked */}
      {!isCalendarView ? (
        <div>
          <table className="table-auto">
            <thead>
              <tr>
              <th>ID</th>
              <th>Employee</th>
              <th>Start Date</th>
              <th>End Date</th>
              </tr>
            </thead>
            <tbody>

              {timesheetsAndEmployees.map((timesheet: any) => (

                <tr key={timesheet.id}>
                  <td>#{timesheet.id}</td>
                  <td>{timesheet.full_name} (ID: {timesheet.employee_id})</td>
                  <td>{timesheet.start_time}</td>
                  <td>{timesheet.end_time}</td>

                </tr>

              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>
            To implement, see <a href="https://schedule-x.dev/docs/frameworks/react">Schedule X React documentation</a>.
          </p>
        </div>
      )}

    </div>
  );
}
