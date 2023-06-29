import './App.css'
import { Routes, Route } from 'react-router-dom'
import {
  SearchPage,
  TutorProfile,
  Landing,
  Login,
  Register,
  FormTutor,
  Meeting,
  FAQs,
  NotFound,
} from './views'
import UserDashboard from './views/UserDashboard'
import { SocketContext, socket } from './socket/context'
import RestorePassword from './views/RestorePassword'
import useUser from './hooks/useUser'
import { L10n } from '@syncfusion/ej2-base'
import { registerLicense } from '@syncfusion/ej2-base'
const LICENSE_KEY = import.meta.env.VITE_SYNCFUSION_LICENSE_KEY
registerLicense(LICENSE_KEY)

L10n.load({
  es: {
    grid: {
      EmptyRecord: 'No hay registros para mostrar',
    },
    pager: {
      currentPageInfo: '{0} de {1} páginas',
      totalItemsInfo: '({0} elementos)',
      firstPageTooltip: 'Ir a la primera página',
      lastPageTooltip: 'Ir a la última página',
      nextPageTooltip: 'Ir a la página siguiente',
      previousPageTooltip: 'Ir a la página anterior',
      nextPagerTooltip: 'Ir al siguiente paginador',
      previousPagerTooltip: 'Ir al paginador anterior',
    },
    calendar: {
      today: 'Hoy',
    },
    datepicker: {
      today: 'Hoy',
      placeholder: 'Seleccionar fecha',
      clearButtonTitle: 'Limpiar',
      timeButtonTitle: 'Seleccionar hora',
      cancelButtonText: 'Cancelar',
      doneButtonText: 'Aceptar',
      nextMonth: 'Mes siguiente',
      previousMonth: 'Mes anterior',
      emptyDay: 'Día vacío',
      // tslint:disable-next-line:max-line-length
    },
    timepicker: {
      placeholder: 'Seleccionar hora',
    },
    datetimepicker: {
      today: 'Hoy',
      placeholder: 'Seleccionar fecha y hora',
      timePlaceholder: 'Seleccionar hora',
    },
    daterangepicker: {
      placeholder: 'Seleccionar rango de fechas',
    },
    multiselect: {
      noRecordsTemplate: 'No hay registros para mostrar',
      actionFailureTemplate: 'No hay registros para mostrar',
      overflowCountTemplate: '+${count} más...',
    },
    input: {
      incrementTitle: 'Incrementar',
      decrementTitle: 'Decrementar',
    },
    schedule: {
      day: 'Día',
      week: 'Semana',
      workWeek: 'Semana laboral',
      month: 'Mes',
      agenda: 'Agenda',
      weekAgenda: 'Agenda semanal',
      workWeekAgenda: 'Agenda semanal laboral',
      monthAgenda: 'Agenda mensual',
      today: 'Hoy',
      noEvents: 'No hay eventos',
      emptyContainer: 'No hay eventos programados en este día.',
      allDay: 'Todo el día',
      start: 'Inicio',
      end: 'Fin',
      more: 'Más',
      close: 'Cerrar',
      cancel: 'Cancelar',
      noTitle: '(Sin título)',
      delete: 'Eliminar',
      deleteEvent: 'Eliminar evento',
      deleteMultipleEvent: 'Eliminar múltiples eventos',
      selectedItems: 'Elementos seleccionados',
      deleteSeries: 'Eliminar serie',
      edit: 'Editar',
      editSeries: 'Editar serie',
      editEvent: 'Editar evento',
      createEvent: 'Crear',
      subject: 'Asunto',
      addTitle: 'Agregar título',
      moreDetails: 'Más detalles',
      save: 'Guardar',
      editContent: '¿Desea editar solo este evento o toda la serie?',
    },
  },
})

function App() {
  const user = useUser()
  return (
    <div className="App">
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/restore" element={<RestorePassword />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/tutor/:id" element={<TutorProfile />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/tutor" element={<FormTutor />} />
          <Route path="/meeting/:id" element={<Meeting />} />
          <Route path="/FAQs" element={<FAQs />} />
        </Routes>
      </SocketContext.Provider>
    </div>
  )
}

export default App
