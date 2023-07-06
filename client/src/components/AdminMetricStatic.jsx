import React, { useEffect } from 'react'
import { Card, Metric, Text, Icon, Flex, Grid } from '@tremor/react'
import {
  CashIcon,
  TicketIcon,
  UserGroupIcon,
  ClockIcon,
  VideoCameraIcon
} from '@heroicons/react/solid'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllSessions } from '../redux/features/sessions/sessionsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'

const AdminMetricStatic = () => {
  const dispatch = useDispatch()
  const allSessions = useSelector(state => state.sessions.allSessions)
  const allSessionsData = useSelector(state => state.sessions.allSessionsData)
  const users = useSelector(state => state.users.allUsers)

  const sessionsTimebyHour = allSessionsData.totalMinutes
  const hours = Math.floor(sessionsTimebyHour / 60)
  const minutes = (sessionsTimebyHour % 60).toFixed(0).padStart(2, '0')
  const formattedSessionsTime = `${hours}h ${minutes}m`

  const categories = [
    {
      title: 'Transacciones desde inicio',
      metric: allSessionsData.earnings
        ? `$ ${allSessionsData.earnings.toLocaleString()}`
        : '-',
      icon: TicketIcon,
      color: 'violet'
    },
    {
      title: 'Ganancias desde inicio (10%)',
      metric: allSessionsData.earnings
        ? `$ ${(allSessionsData.earnings * 0.1).toLocaleString()}`
        : '-',
      icon: CashIcon,
      color: 'violet'
    },
    {
      title: 'Usuarios totales',
      metric: users.length,
      icon: UserGroupIcon,
      color: 'violet'
    },
    {
      title: 'Sesiones totales',
      metric: allSessions.length,
      icon: VideoCameraIcon,
      color: 'violet'
    },
    {
      title: 'Horas de sesiones totales',
      metric: formattedSessionsTime,
      icon: ClockIcon,
      color: 'violet'
    }
  ]

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

  useEffect(() => {
    dispatch(usersFetch())
    dispatch(fetchAllSessions())
  }, [])

  return (
    <div className='flex justify-center lg:mt-12 mt-4'>
      <Grid
        numItems={2}
        numItemsSm={2}
        numItemsLg={3}
        className='lg:gap-6 gap-3 lg:w-4/5 w-full'
      >
        {categories.map(item => (
          <Card key={item.title} decoration='top' decorationColor={item.color}>
            <Flex justifyContent='start' className='space-x-4'>
              <Icon
                icon={item.icon}
                variant='light'
                size='xl'
                color={item.color}
              />
              <div className='truncate'>
                <Text>{item.title}</Text>
                <Metric className='truncate'>{item.metric}</Metric>
              </div>
            </Flex>
          </Card>
        ))}
      </Grid>
    </div>
  )
}

export default AdminMetricStatic
