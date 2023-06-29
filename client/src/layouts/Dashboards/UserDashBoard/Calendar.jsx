import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject
} from '@syncfusion/ej2-react-schedule'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompleteSessionsByClient } from '../../../redux/features/sessions/sessionsSlice'

import '../../../Calendar.css'
import moment from 'moment'
import { loadCldr } from '@syncfusion/ej2-base'
import * as numberingSystems from 'cldr-data/supplemental/numberingSystems.json'
import * as gregorian from 'cldr-data/main/es/ca-gregorian.json'
import * as numbers from 'cldr-data/main/es/numbers.json'
import * as timeZoneNames from 'cldr-data/main/es/timeZoneNames.json'
import * as currencies from 'cldr-data/main/es/currencies.json'
import * as dateFields from 'cldr-data/main/es/dateFields.json'
loadCldr(
  numberingSystems,
  gregorian,
  numbers,
  timeZoneNames,
  currencies,
  dateFields
)

export default function Calendar (props) {
  const { user } = props
  const [eventsClient, setEventsClient] = useState([])
  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions.completeSessionsByClient)

  useEffect(() => {
    dispatch(fetchCompleteSessionsByClient(user.id))
  }, [])

  useEffect(() => {
    if (sessions) {
      const events = sessions.map(session => {
        return {
          Id: session.sessionId,
          Subject: `Sesión con ${session.tutorUserId.fullName}`,
          StartTime: moment(session.appointmentDate).toDate(),
          EndTime: moment(session.appointmentDate)
            .add(session.minutes, 'minutes')
            .toDate(),
          Description: `http://localhost:5173/meeting/${session.sessionId}`
        }
      })
      setEventsClient(events)
    }
  }, [sessions])

  const eventsClientSettings = { dataSource: eventsClient }

  return (
    <div>
      <h1 className='text-4xl font-bold my-5'>Calendario</h1>
      <ScheduleComponent
        height='800px'
        selectedDate={new Date()}
        eventSettings={eventsClientSettings}
        // disable add/edit/delete
        readonly={true}
        locale='es'
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
      </ScheduleComponent>
    </div>
  )
}
