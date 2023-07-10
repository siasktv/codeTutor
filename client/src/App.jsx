import './App.css'
import { Routes, Route } from 'react-router-dom'
import {
  SearchPage,
  TutorProfile,
  Login,
  Register,
  FormTutor,
  Meeting,
  FAQs,
  NotFound,
  Landing2
} from './views'
import UserDashboard from './views/UserDashboard'
import { SocketContext, socket } from './socket/context'
import RestorePassword from './views/RestorePassword'
import useUser from './hooks/useUser'
import AdminDashboard from './views/AdminDashboard'
import TutorDashboard from './views/TutorDashboard'
import { L10n } from '@syncfusion/ej2-base'
import { registerLicense } from '@syncfusion/ej2-base'
const LICENSE_KEY = import.meta.env.VITE_SYNCFUSION_LICENSE_KEY
registerLicense(LICENSE_KEY)
import { useEffect, useState } from 'react'
import { ModalBankTutor } from './components'

L10n.load({
  es: {
    grid: {
      EmptyRecord: 'No hay registros para mostrar'
    },
    pager: {
      currentPageInfo: '{0} de {1} páginas',
      totalItemsInfo: '({0} elementos)',
      firstPageTooltip: 'Ir a la primera página',
      lastPageTooltip: 'Ir a la última página',
      nextPageTooltip: 'Ir a la página siguiente',
      previousPageTooltip: 'Ir a la página anterior',
      nextPagerTooltip: 'Ir al siguiente paginador',
      previousPagerTooltip: 'Ir al paginador anterior'
    },
    calendar: {
      today: 'Hoy'
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
      emptyDay: 'Día vacío'
      // tslint:disable-next-line:max-line-length
    },
    timepicker: {
      placeholder: 'Seleccionar hora'
    },
    datetimepicker: {
      today: 'Hoy',
      placeholder: 'Seleccionar fecha y hora',
      timePlaceholder: 'Seleccionar hora'
    },
    daterangepicker: {
      placeholder: 'Seleccionar rango de fechas'
    },
    multiselect: {
      noRecordsTemplate: 'No hay registros para mostrar',
      actionFailureTemplate: 'No hay registros para mostrar',
      overflowCountTemplate: '+${count} más...'
    },
    input: {
      incrementTitle: 'Incrementar',
      decrementTitle: 'Decrementar'
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
      editContent: '¿Desea editar solo este evento o toda la serie?'
    }
  }
})

function App () {
  const user = useUser()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (user) {
      if (user.role === 'Tutor' && !user.tutor.bankAccount) {
        setShowModal(true)
      } else {
        setShowModal(false)
      }
    }
  }, [user])

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark')
      document.getElementById('themeSyncfusion').href =
        'https://cdn.syncfusion.com/ej2/tailwind-dark.css'
      // change scrollbar color
      document.documentElement.classList.add('scrollbarDark')
    } else {
      document.documentElement.classList.remove('dark')
      document.getElementById('themeSyncfusion').href =
        'https://cdn.syncfusion.com/ej2/tailwind.css'
      document.documentElement.classList.remove('scrollbarDark')
    }
  }, [])

  return (
    <div className='App dark:bg-gray-900' id='codetutorapp'>
      <SocketContext.Provider value={socket}>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Landing2 />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/restore' element={<RestorePassword />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/tutor/:id' element={<TutorProfile />} />
          <Route path='/user' element={<UserDashboard />} />
          <Route path='/tutor' element={<FormTutor />} />
          <Route path='/meeting/:id' element={<Meeting />} />
          <Route path='/FAQs' element={<FAQs />} />
          <Route path='/tutordashboard' element={<TutorDashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Routes>
      </SocketContext.Provider>
      {showModal && (
        <ModalBankTutor setShowModal={setShowModal} tutorId={user.tutor._id} />
      )}
    </div>
  )
}

export default App
