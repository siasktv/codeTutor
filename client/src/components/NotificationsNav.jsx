import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faTrash } from '@fortawesome/free-solid-svg-icons'
import notification from '../assets/notification.svg'

export default function NotificationsNav ({
  notifications,
  showNotifications,
  setShowNotifications,
  handleShowNotifications,
  user,
  handleSendShowMessage,
  markAsRead
}) {
  return (
    <div className='pr-8 pl-3 flex items-center relative'>
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
            <div className='p-3 h-10 w-10  bg-violet-100 rounded-xl'>
              <img src={notification} className=''></img>
            </div>
          </div>
          {showNotifications && (
            <div className='absolute top-10 right-3 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
              <div className='flex flex-col gap-2 p-4 max-h-80'>
                <div className='flex justify-between items-start flex-1'>
                  <h1 className='font-bold text-xl text-codecolor'>
                    Notificaciones
                  </h1>
                  <button onClick={() => setShowNotifications(false)}>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className='text-codecolor active:scale-90 transition duration-150 hover:text-codecolordark'
                    />
                  </button>
                </div>
                <div className='flex flex-col overflow-y-auto max-h-480px'>
                  {notifications.length === 0 && (
                    <div className='flex flex-col gap-2 m-3'>
                      <div className='flex justify-center align-middle items-center'>
                        <h1 className='text-black font-semibold w-72 m-3'>
                          No tienes notificaciones.
                        </h1>
                      </div>
                    </div>
                  )}
                  {notifications.map(notification => (
                    <React.Fragment key={notification.id}>
                      {notification.type === 'link' && (
                        <div className='flex flex-col gap-2 p-3 hover:bg-codecolorlighter cursor-pointer hover:rounded-md'>
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
                                <h2 className='text-md'>
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
                        <div className='flex flex-col gap-2 p-3 hover:bg-codecolorlighter cursor-pointer hover:rounded-md'>
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
                                <h2 className='text-md'>
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
