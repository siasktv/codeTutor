import React from 'react'
import { Card, Title, AreaChart, Metric, Flex, Text } from '@tremor/react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  fetchAllSessionsByTutor,
  fetchAllSessionsDataByTutor,
  fetchAllSessionsByClient,
  fetchAllSessions,
  fetchAllSessionsData,
  fetchAllSessionsDataByClient
} from '../redux/features/sessions/sessionsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'

const TutorDashboardGraphbyMonth = props => {
  const { tutor, user } = props

  const dispatch = useDispatch()
  const tutorSessions = useSelector(state => state.sessions.allSessionsByTutor)

  useEffect(() => {
    if (tutor && user) {
      dispatch(fetchAllSessionsByTutor(tutor.user._id))
    }
  }, [])

  const colors = {
    increase: 'emerald',
    moderateIncrease: 'emerald',
    unchanged: 'orange',
    moderateDecrease: 'rose',
    decrease: 'rose'
  }

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

  // console.log(sessionsByDay['2023-06-26'])

  const currentMonth = new Date().getMonth() + 1
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1

  // Obtener los datos del mes actual y el mes pasado
  const currentMonthData =
    sessionsByMonth[`2023-${currentMonth.toString().padStart(2, '0')}`] || []
  const previousMonthData =
    sessionsByMonth[`2023-${previousMonth.toString().padStart(2, '0')}`] || []

  // Obtener los precios diarios del mes actual y el mes pasado
  const currentMonthPrices = {}
  const previousMonthPrices = {}

  currentMonthData.forEach(session => {
    const { date, price } = session
    const [day, month, year] = date.split('/')

    // Sumar el precio al valor existente o inicializarlo en 0 si no existe
    currentMonthPrices[day] = (currentMonthPrices[day] || 0) + price
  })

  previousMonthData.forEach(session => {
    const { date, price } = session
    const [day, month, year] = date.split('/')

    // Sumar el precio al valor existente o inicializarlo en 0 si no existe
    previousMonthPrices[day] = (previousMonthPrices[day] || 0) + price
  })
  // Crear el arreglo de datos para el gráfico
  const chartdata = []
  for (let day = 1; day <= 31; day++) {
    const currentMonthPrice = currentMonthPrices[day.toString()] || 0
    const previousMonthPrice = previousMonthPrices[day.toString()] || 0

    chartdata.push({
      day: day.toString(),
      'Mes pasado': previousMonthPrice,
      'Mes actual': currentMonthPrice
    })
  }

  const totalMetric = chartdata.reduce((total, record) => {
    if (record['Mes actual']) {
      total += record['Mes actual']
    }
    return total
  }, 0)

  const currentMonthPrice = currentMonthData.reduce((total, session) => {
    return total + (session.price || 0)
  }, 0)

  const previousMonthPrice = previousMonthData.reduce((total, session) => {
    return total + (session.price || 0)
  }, 0)

  const calculateDeltaPercentage = (past, current) => {
    if (past === 0) return 0
    const difference = current - past
    return ((difference / past) * 100).toFixed(2)
  }

  const delta = calculateDeltaPercentage(previousMonthPrice, currentMonthPrice)

  const dataFormatter = number =>
    `${Intl.NumberFormat('us').format(number).toString()}$`

  return (
    <div className='flex justify-center'>
      <Card className='w-full my-4 h-full'>
        <Title>Transacciones totales este mes (USD)</Title>
        <Metric>{dataFormatter(totalMetric)}</Metric>
        <Flex justifyContent='start' className='space-x-1 truncate'>
          <Text color={colors[delta >= 0 ? 'increase' : 'decrease']}>
            {delta}%
          </Text>
          <Text className='truncate'>con respecto al mes anterior</Text>
        </Flex>
        <AreaChart
          className='h-72 mt-4'
          data={chartdata}
          index='day'
          categories={['Mes pasado', 'Mes actual']}
          colors={['cyan', 'violet']}
          valueFormatter={dataFormatter}
        />
      </Card>
    </div>
  )
}

export default TutorDashboardGraphbyMonth
