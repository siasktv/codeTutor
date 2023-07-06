import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faTrash,
  faVolumeUp,
  faVolumeMute,
  faBell,
  faBellSlash
} from '@fortawesome/free-solid-svg-icons'
import notification from '../assets/notification.svg'
import { useDispatch, useSelector } from 'react-redux'
import {
  getNotificationsStatus,
  setNotificationsStatus
} from '../redux/features/localUser/localUserSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NotificationsNav ({
  notifications,
  showNotifications,
  setShowNotifications,
  handleShowNotifications,
  user,
  handleSendShowMessage,
  markAsRead
}) {
  const dispatch = useDispatch()
  const { soundEnabled, alertsEnabled } = useSelector(state => state.localUser)
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundEnabled)
  const [isAlertEnabled, setIsAlertEnabled] = useState(alertsEnabled)

  useEffect(() => {
    dispatch(getNotificationsStatus())
  }, [])

  const handleSound = () => {
    setIsSoundEnabled(!isSoundEnabled)
    dispatch(
      setNotificationsStatus({
        soundEnabled: !isSoundEnabled,
        alertsEnabled: isAlertEnabled
      })
    )
  }

  const handleAlert = () => {
    setIsAlertEnabled(!isAlertEnabled)
    dispatch(
      setNotificationsStatus({
        soundEnabled: isSoundEnabled,
        alertsEnabled: !isAlertEnabled
      })
    )
  }

  useEffect(() => {
    const newSoundEnabled =
      soundEnabled === 'true' || soundEnabled === true ? true : false
    setIsSoundEnabled(newSoundEnabled)
  }, [soundEnabled])

  useEffect(() => {
    const newAlertEnabled =
      alertsEnabled === 'true' || alertsEnabled === true ? true : false
    setIsAlertEnabled(newAlertEnabled)
  }, [alertsEnabled])

  return (
    <div className='lg:pr-8 pl-3 flex items-center relative'>
      {user && (
        <div className='flex flex-col'>
          <div
            className='cursor-pointer active:scale-90 transition duration-150 select-none'
            onClick={handleShowNotifications}
          >
            {notifications.filter(n => n.isRead === false).length > 0 && (
              <div className='relative -right-1 -top-1 flex'>
                <p className='text-xs bg-red-500 text-white rounded-full absolute right-0 flex justify-center items-center w-5 h-5 z-50'>
                  {notifications.filter(n => n.isRead === false).length}
                </p>
              </div>
            )}
            <div className='p-3 h-10 w-10  bg-violet-100 dark:bg-gray-800 rounded-xl'>
              <img src={notification} className=''></img>
            </div>
          </div>
          {showNotifications && (
            <div className='absolute top-12 lg:right-3 -right-[50px] bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-[#1414140D]'>
              <div className='flex flex-col gap-2 p-4 max-h-80 max-lg:w-full'>
                <div className='flex justify-between items-start flex-1'>
                  <div className='flex flex-row items-center'>
                    <h1 className='font-bold text-xl text-codecolor'>
                      Notificaciones
                    </h1>
                    <FontAwesomeIcon
                      icon={
                        isSoundEnabled === true || isSoundEnabled === 'true'
                          ? faVolumeUp
                          : faVolumeMute
                      }
                      onClick={() => handleSound()}
                      className='text-codecolor active:scale-90 transition duration-150 hover:text-codecolordark ml-3 mt-1 cursor-pointer'
                    />
                    <FontAwesomeIcon
                      icon={isAlertEnabled ? faBell : faBellSlash}
                      onClick={() => handleAlert()}
                      className='text-codecolor active:scale-90 transition duration-150 hover:text-codecolordark ml-3 mt-1 cursor-pointer'
                    />
                  </div>
                  <button onClick={() => setShowNotifications(false)}>
                    <FontAwesomeIcon
                      icon={faXmark}
                      onClick={() => setShowNotifications(false)}
                      className='text-codecolor active:scale-90 transition duration-150 hover:text-codecolordark'
                    />
                  </button>
                </div>
                <div className='flex flex-col overflow-y-auto max-h-480px'>
                  {notifications.length === 0 && (
                    <div className='flex flex-col gap-2 m-3'>
                      <div className='flex justify-center align-middle items-center'>
                        <h1 className='text-black font-semibold dark:text-gray-200 w-72 m-3'>
                          No tienes notificaciones.
                        </h1>
                      </div>
                    </div>
                  )}
                  {notifications
                    // sort by date
                    .sort((a, b) => {
                      return new Date(b.createdAt) - new Date(a.createdAt)
                    })
                    .map(notification => (
                      <React.Fragment key={notification.id}>
                        {notification.type === 'link' && (
                          <div className='flex flex-col gap-2 p-3 hover:bg-codecolorlighter dark:hover:bg-gray-700 cursor-pointer hover:rounded-md'>
                            <div className='flex justify-center align-middle items-center'>
                              <Link
                                to={notification.link}
                                className='flex flex-row items-center'
                              >
                                <img
                                  className='w-10 h-10 rounded-full border-none mr-2 object-cover'
                                  src={notification.sender.image}
                                  alt='avatar'
                                />
                                <div className='flex flex-col w-60 text-left'>
                                  <h2 className='text-md dark:text-gray-200'>
                                    {notification.message}{' '}
                                  </h2>
                                </div>
                              </Link>
                              <div className='flex justify-end ml-3'>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className='text-codecolor font-bold active:scale-90 transition duration-150 cursor-pointer hover:text-codecolordark'
                                  onClick={e => {
                                    e.preventDefault()
                                    markAsRead(notification.id)
                                  }}
                                >
                                  Marcar como leído
                                </FontAwesomeIcon>
                              </div>
                            </div>
                          </div>
                        )}
                        {notification.type === 'message' && (
                          <div className='flex flex-col gap-2 p-3 dark:hover:bg-gray-700 hover:bg-codecolorlighter dark:hover:gray-700 cursor-pointer hover:rounded-md'>
                            <div className=' flex justify-center align-middle items-center'>
                              <div
                                className='flex flex-row items-center'
                                onClick={e => {
                                  handleSendShowMessage(e, {
                                    ...notification.sender,
                                    _id: notification.sender.id
                                  })
                                  setShowNotifications(false)
                                }}
                              >
                                <img
                                  className='w-10 h-10 rounded-full border-none mr-2 object-cover'
                                  src={notification.sender.image}
                                  alt='avatar'
                                />
                                <div className='flex flex-col w-60 text-left'>
                                  <h2 className='text-md dark:text-gray-200'>
                                    {notification.message}{' '}
                                  </h2>
                                </div>
                              </div>
                              <div className='flex justify-end ml-3'>
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  className='text-codecolor font-bold active:scale-90 transition duration-150 cursor-pointer hover:text-codecolordark'
                                  onClick={e => {
                                    e.preventDefault()
                                    markAsRead(notification.id)
                                  }}
                                >
                                  Marcar como leído
                                </FontAwesomeIcon>
                              </div>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
