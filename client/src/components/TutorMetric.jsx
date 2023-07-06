import React, { useEffect } from 'react'
import { Card, Metric, Text, Flex, BadgeDelta, Grid, Icon } from '@tremor/react'
import { CashIcon, TicketIcon, VideoCameraIcon } from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchAllSessionsByTutor,
  fetchAllSessionsDataByTutor,
  fetchAllSessionsByClient,
  fetchAllSessions,
  fetchAllSessionsData,
  fetchAllSessionsDataByClient,
  fetchSession
} from '../redux/features/sessions/sessionsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'

const TutorMetric = props => {
  const { tutor, user } = props
  const dispatch = useDispatch()
  const tutorSessions = useSelector(state => state.sessions.allSessionsByTutor)
  useEffect(() => {
    if (tutor && user) {
      dispatch(fetchAllSessionsByTutor(tutor.user._id))
    }
  }, [])

  const sessionsByYear = {}
  const sessionsByMonth = {}
  const sessionsByDay = {}

  tutorSessions
    .filter(session => session?.isPaid === true)
    .forEach(session => {
      const { date } = session
      const [day, month, year] = date.split('/')

      // Agrupar por año
      if (!sessionsByYear[year]) {
        sessionsByYear[year] = []
      }
      sessionsByYear[year].push(session)

      // Agrupar por mes
      const monthKey = `${year}-${month}`
      if (!sessionsByMonth[monthKey]) {
        sessionsByMonth[monthKey] = []
      }
      sessionsByMonth[monthKey].push(session)

      // Agrupar por día
      const dayKey = `${year}-${month}-${day}`
      if (!sessionsByDay[dayKey]) {
        sessionsByDay[dayKey] = []
      }
      sessionsByDay[dayKey].push(session)
    })

  const currentMonth = new Date().getMonth() + 1
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1

  // Obtener los datos del mes actual y el mes pasado
  const currentMonthData =
    sessionsByMonth[`2023-${currentMonth.toString().padStart(2, '0')}`] || []
  const previousMonthData =
    sessionsByMonth[`2023-${previousMonth.toString().padStart(2, '0')}`] || []

  const currentMonthPrice = currentMonthData.reduce(
    (total, session) => total + session.price,
    0
  )
  const previousMonthPrice = previousMonthData.reduce(
    (total, session) => total + session.price,
    0
  )

  const currentMonthFormattedPrice = `$ ${currentMonthPrice.toLocaleString()}`
  const previousMonthFormattedPrice = `$ ${previousMonthPrice.toLocaleString()}`

  const delta =
    ((currentMonthPrice - previousMonthPrice) / previousMonthPrice) * 100
  const deltaType = delta > 0 ? 'moderateIncrease' : 'moderateDecrease'

  const currentMonthProfit = currentMonthPrice * 0.9
  const previousMonthProfit = previousMonthPrice * 0.9

  const currentMonthFormattedProfit = `$ ${currentMonthProfit.toLocaleString()}`
  const previousMonthFormattedProfit = `$ ${previousMonthProfit.toLocaleString()}`

  const currentMonthSessions = currentMonthData.length
  const previousMonthSessions = previousMonthData.length

  const deltaProfit =
    ((currentMonthProfit - previousMonthProfit) / previousMonthProfit) * 100
  const deltaSessions =
    ((currentMonthSessions - previousMonthSessions) / previousMonthSessions) *
    100
  const deltaSessionsFormatted = `${deltaSessions.toFixed(1)}%`

  const deltaTypePrice = delta > 0 ? 'moderateIncrease' : 'moderateDecrease'
  const deltaTypeProfit =
    deltaProfit > 0 ? 'moderateIncrease' : 'moderateDecrease'
  const deltaTypeSessions =
    deltaSessions > 0 ? 'moderateIncrease' : 'moderateDecrease'

  const categories = [
    {
      title: 'Transacciones del mes',
      icon: TicketIcon,
      metric: currentMonthFormattedPrice,
      metricPrev: previousMonthFormattedPrice || 'No posees datos',
      delta:
        previousMonthPrice !== 0 ? `${delta.toFixed(1)}%` : 'No posees datos',
      deltaType: deltaTypePrice
    },
    {
      title: 'Ganancias del mes (con débito de comisiones)',
      icon: CashIcon,
      metric: currentMonthFormattedProfit,
      metricPrev: previousMonthFormattedProfit || 'No posees datos',
      delta:
        previousMonthProfit !== 0
          ? `${deltaProfit.toFixed(1)}%`
          : 'No posees datos',
      deltaType: deltaTypeProfit
    },
    {
      title: 'Sesiones del mes',
      icon: VideoCameraIcon,
      metric: currentMonthSessions.toString(),
      metricPrev: previousMonthSessions.toString() || 'No posees datos',
      delta:
        previousMonthSessions !== 0
          ? deltaSessionsFormatted
          : 'No posees datos',
      deltaType: deltaTypeSessions
    }
  ]

  const colors = {
    increase: 'emerald',
    moderateIncrease: 'emerald',
    unchanged: 'orange',
    moderateDecrease: 'rose',
    decrease: 'rose'
  }

  const calculateDeltaType = item => {
    if (
      parseFloat(item.metricPrev.replace(/[^0-9.-]+/g, '')) >
      parseFloat(item.metric.replace(/[^0-9.-]+/g, ''))
    ) {
      return 'moderateDecrease'
    } else {
      return 'moderateIncrease'
    }
  }

  return (
    <div className='flex justify-center'>
      <Grid
        numItemsSm={3}
        numItemsLg={3}
        className='lg:gap-6 gap-3 mt-12 lg:w-4/5 w-full max-lg:px-3'
      >
        {categories.map(item => (
          <Card key={item.title}>
            <Icon icon={item.icon} variant='light' size='sm' color='violet' />
            <Text className='mt-3'>{item.title}</Text>
            <Flex
              justifyContent='start'
              alignItems='baseline'
              className='truncate space-x-3'
            >
              <Metric>{item.metric}</Metric>
              <Text className='truncate'>mes pasado {item.metricPrev}</Text>
            </Flex>
            <Flex justifyContent='start' className='space-x-2 mt-4'>
              <BadgeDelta deltaType={calculateDeltaType(item)} />
              <Flex justifyContent='start' className='space-x-1 truncate'>
                <Text
                  className=' text-xs'
                  color={colors[calculateDeltaType(item)]}
                >
                  {item.delta}
                </Text>
                <Text className='truncate text-xs'>sobre el mes anterior</Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  )
}

export default TutorMetric
