import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
    createViewDay,
    createViewMonthAgenda,
    createViewMonthGrid,
    createViewWeek,
} from '@schedule-x/calendar'
import 'temporal-polyfill/global'
import '@schedule-x/theme-default/dist/index.css'
import { createEventModalPlugin } from '@schedule-x/event-modal'


export default function CalendarComponent({ timesheets }: any) {
    const eventModal = createEventModalPlugin()

    const calendar = useCalendarApp({
        views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
        events: timesheets?.map((timesheet: any) => ({
            id: timesheet.id,
            title: `${timesheet.title} (${timesheet.full_name})`,
            people: [timesheet.full_name],
            start: Temporal.ZonedDateTime.from(`${timesheet.start_time}+01:00[Africa/Douala]`),
            end: Temporal.ZonedDateTime.from(`${timesheet.end_time}+01:00[Africa/Douala]`)
        })) || [],
        plugins: [eventModal]
    })

    eventModal.close();

    return (
        <ScheduleXCalendar calendarApp={calendar} />
    )
}
