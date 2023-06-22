import NavDashboard from '../components/NavDashboard'
import UserDashboardCards from '../components/UserDashBoardCards'
import UserDashboardContent from '../components/UserDashboardContent'
import UserDashboardLayout from '../layouts/Dashboards/UserDashboardLayout'
import useUser from '../hooks/useUser'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components'

const UserDashboard = () => {
  const user = useUser()
  const navigate = useNavigate()
  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [user])

  return (
    <>
      {user && (
        <div className='flex'>
          <div>
            <UserDashboardLayout />
          </div>
          <div className='flex flex-col justify-center w-full h-full left-0 right-0'>
            <NavDashboard user={user} />
            <div className='flex flex-col bg-[#FAFBFC]'>
              <UserDashboardContent />
              <UserDashboardCards />
            </div>
          </div>
        </div>
      )}
      {!user && (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default UserDashboard