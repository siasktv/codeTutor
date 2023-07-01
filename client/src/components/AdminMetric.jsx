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

const AdminMetric = () => {
  const dispatch = useDispatch()
  const allSessions = useSelector(state => state.sessions.allSessions)
  const allSessionsData = useSelector(state => state.sessions.allSessionsData)
  useEffect(() => {
    dispatch(usersFetch())
    dispatch(fetchAllSessions())
  }, [])

  const sessionsByYear = {}
  const sessionsByMonth = {}
  const sessionsByDay = {}

  allSessions.forEach(session => {
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

  const currentMonthProfit = currentMonthPrice * 0.1
  const previousMonthProfit = previousMonthPrice * 0.1

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

  const deltaTypePrice = delta > 0 ? 'moderateIncrease' : 'moderateIncrease'
  const deltaTypeProfit =
    deltaProfit > 0 ? 'moderateIncrease' : 'moderateDecrease'
  const deltaTypeSessions =
    deltaSessions > 0 ? 'moderateIncrease' : 'moderateDecrease'

  const categories = [
    {
      title: 'Transacciones del mes',
      icon: TicketIcon,
      metric: currentMonthFormattedPrice,
      metricPrev: previousMonthFormattedPrice,
      delta:
        previousMonthFormattedPrice !== 0 && !isNaN(delta)
          ? `${delta.toFixed(1)}%`
          : 'No posees datos del mes anterior',
      deltaType: 'moderateIncrease'
    },
    {
      title: 'Ganancias del mes (10%)',
      icon: CashIcon,
      metric: currentMonthFormattedProfit,
      metricPrev: previousMonthFormattedProfit,
      delta:
        previousMonthProfit !== 0
          ? `${deltaProfit.toFixed(1)}%`
          : 'No posees datos del mes anterior',
      deltaType: deltaTypeProfit
    },
    {
      title: 'Sesiones del mes',
      icon: VideoCameraIcon,
      metric: currentMonthSessions.toString(),
      metricPrev: previousMonthSessions.toString(),
      delta:
        previousMonthSessions !== 0
          ? deltaSessionsFormatted
          : 'No posees datos del mes anterior',
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
      <Grid numItemsSm={2} numItemsLg={3} className='gap-6 mt-12 w-4/5'>
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
                <Text color={colors[calculateDeltaType(item)]}>
                  {item.delta}
                </Text>
                <Text className='truncate'>sobre el mes anterior</Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  )
}

export default AdminMetric
