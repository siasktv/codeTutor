import {
  faXmark,
  faMessage,
  faCircle,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons'
import moment from 'moment/moment'
import 'moment/locale/es'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Loader } from '../components'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersFetch } from '../redux/features/users/usersSlice'

export default function ChatsNav ({
  user,
  handleShowChat,
  showChat,
  setShowChat,
  localUserChats,
  handleSendShowMessage
}) {
  moment.locale('es')

  const [allChats, setAllChats] = useState([])
  const [chats, setChats] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const users = useSelector(state => state.users.allUsers)
  const [newUsersChat, setNewUsersChat] = useState([])
  const [allNewUsersChat, setAllNewUsersChat] = useState([])
  const [inputValue, setInputValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (!users[0]?._id) {
      dispatch(usersFetch())
    }
  }, [dispatch, users])

  useEffect(() => {
    setAllChats(localUserChats)
    setChats(localUserChats)
  }, [localUserChats])

  useEffect(() => {
    if (users[0]?._id) {
      if (!allChats[0]?._id) {
        setNewUsersChat(users)
      } else {
        const idsFromChats = allChats
          .filter(chat => chat?.lastMessage)
          .map(chat => chat.members.map(m => m._id))
        const idsFromUsers = users.map(user => user._id)
        const ids = idsFromChats.flat()
        const idsUsers = idsFromUsers.flat()
        const newUsers = idsUsers.filter(id => !ids.includes(id))
        const newUsersChat = users.filter(user => newUsers.includes(user._id))
        setNewUsersChat(newUsersChat)
        setAllNewUsersChat(newUsersChat)
      }
    }
  }, [users, allChats])

  useEffect(() => {
    if (showChat === false) {
      setShowCreate(false)
    }
  }, [showChat])

  const handleInputChange = e => {
    const value = inputValue
    if (value.trim() === '') {
      setChats(allChats)
      return
    }
    function isMatch (name, filterBy) {
      let pattern = filterBy.split('').join('.*')
      let regex = new RegExp(pattern)

      return regex.test(name)
    }
    let filteredChats = allChats.filter(chat =>
      chat.members.some(
        member =>
          isMatch(member.fullName.toLowerCase(), value.toLowerCase()) &&
          member._id !== user.id
      )
    )
    setChats(filteredChats)
  }

  const handleInputChangeCreate = e => {
    const value = inputValue
    if (value.trim() === '') {
      setNewUsersChat(allNewUsersChat)
      return
    }
    function isMatch (name, filterBy) {
      let pattern = filterBy.split('').join('.*')
      let regex = new RegExp(pattern)

      return regex.test(name)
    }
    let filteredChats = allNewUsersChat.filter(user =>
      isMatch(user.fullName.toLowerCase(), value.toLowerCase())
    )
    setNewUsersChat(filteredChats)
  }

  useEffect(() => {
    if (showCreate) {
      handleInputChangeCreate()
    } else {
      handleInputChange()
    }
  }, [inputValue])

  useEffect(() => {
    setInputValue('')
    setNewUsersChat(allNewUsersChat)
    setChats(allChats)
  }, [showCreate])

  return (
    <>
      <div className='pl-3 pr-0 flex items-center'>
        <div
          className='p-2 justify-center items-center h-10 w-10 bg-violet-100 rounded-xl  cursor-pointer active:scale-90 transition duration-150 select-none'
          onClick={e => handleShowChat(e)}
        >
          <FontAwesomeIcon icon={faMessage} className='text-codecolor' />
        </div>
        {showChat && (
          <div className='absolute top-14 mt-2 right-16 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
            <div className='flex flex-col gap-2 p-4 max-h-80 w-72'>
              <div className='flex justify-between items-start flex-1 max-h-8'>
                <h1 className='font-bold text-xl text-codecolor'>Chats</h1>
                <button onClick={() => setShowChat(false)}>
                  <FontAwesomeIcon icon={faXmark} className='text-codecolor' />
                </button>
              </div>
              <div className='flex flex-row items-center w-full justify-between'>
                <input
                  type='text'
                  placeholder='Buscar'
                  id='search'
                  value={inputValue}
                  className='w-full h-10 text-sm rounded-lg border-none text-black px-2 outline-none'
                  onChange={e => setInputValue(e.target.value)}
                />
                <div className='flex flex-col items-center gap-2'>
                  <button
                    className='p-1 rounded-lg text-sm bg-codecolor text-white hover:bg-codecolordark transition duration-150'
                    onClick={() => setShowCreate(!showCreate)}
                  >
                    {showCreate ? 'Cancelar' : 'Nuevo'}
                  </button>
                </div>
              </div>
              <div className='flex flex-col overflow-y-auto max-h-480px gap-2'>
                {showCreate && (
                  <>
                    {newUsersChat.map(user => (
                      <div
                        key={user._id}
                        className='flex items-center gap-2 p-2 w-full rounded-lg cursor-pointer hover:bg-codecolorlight'
                        onClick={e => {
                          handleSendShowMessage(e, user)
                          setShowCreate(false)
                        }}
                      >
                        <div className='flex flex-row items-center w-full'>
                          <div className='rounded-full border-none'>
                            <img
                              src={user.image}
                              alt='avatar'
                              className='w-10 rounded-full'
                              referrerPolicy='no-referrer'
                            />
                          </div>
                          <div className='flex flex-col w-full'>
                            <div className='flex flex-row justify-between'>
                              <h1 className='font-bold text-sm text-codecolor ml-2'>
                                {user.fullName}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {!showCreate && (
                  <>
                    {chats.length > 0 && chats[0] !== 'loading' && (
                      <>
                        {chats
                          .filter(
                            chat => chat.members.length > 1 && chat?.lastMessage
                          )
                          .map(chat => (
                            <div
                              key={chat._id}
                              className='flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-codecolorlight'
                              onClick={e =>
                                handleSendShowMessage(
                                  e,
                                  chat.tutor
                                    ? chat.tutor
                                    : chat.members.find(u => u._id !== user.id)
                                )
                              }
                            >
                              <div className='flex flex-row items-center w-full'>
                                <div className='rounded-full border-none'>
                                  <img
                                    src={
                                      chat.members.find(u => u._id !== user.id)
                                        ?.image || Default
                                    }
                                    alt='avatar'
                                    className='w-10 h-10  rounded-full border-none cursor-pointer object-cover'
                                    referrerPolicy='no-referrer'
                                  ></img>
                                </div>
                                <div className='flex flex-col text-left'>
                                  <p className='text-sm text-gray-900 ml-3 font-semibold'>
                                    {
                                      chat.members.find(u => u._id !== user.id)
                                        ?.fullName
                                    }
                                  </p>
                                  <p className='text-xs text-gray-900 ml-3'>
                                    {chat?.lastMessage && (
                                      <>
                                        {chat?.lastMessage?.sender !==
                                          user.id && (
                                          <span className='text-codecolor'>
                                            <FontAwesomeIcon
                                              icon={faArrowDown}
                                              width={8}
                                              className='mr-1'
                                            />
                                          </span>
                                        )}
                                        {chat?.lastMessage?.sender ===
                                          user.id && (
                                          <span className='text-codecolor'>
                                            <FontAwesomeIcon
                                              icon={faArrowUp}
                                              width={8}
                                              className='mr-1'
                                            />
                                          </span>
                                        )}
                                        {
                                          // if it has more than 15 characters, it cuts it
                                          chat?.lastMessage?.message.length >
                                          8 ? (
                                            <>
                                              {chat?.lastMessage?.message.substring(
                                                0,
                                                8
                                              ) + '... '}
                                            </>
                                          ) : (
                                            <>{chat?.lastMessage?.message}</>
                                          )
                                        }{' '}
                                        -{' '}
                                        {moment(
                                          chat?.lastMessage?.createdAt
                                        ).fromNow()}
                                      </>
                                    )}
                                  </p>
                                </div>
                              </div>
                              <p className='text-xs text-gray-400 text-right justify-end self-center'>
                                {chat?.lastMessage && (
                                  <>
                                    {chat?.lastMessage?.sender !== user.id && (
                                      <>
                                        {!chat?.lastMessage?.read && (
                                          <span className='text-codecolor'>
                                            <FontAwesomeIcon
                                              icon={faCircle}
                                              width={8}
                                            />
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </p>
                            </div>
                          ))}
                      </>
                    )}
                    {chats.length === 0 && localUserChats.length > 0 && (
                      <div className='flex flex-col items-center'>
                        <p className='text-gray-400 text-sm'>
                          No se encontraron resultados.
                        </p>
                      </div>
                    )}
                    {chats.length === 0 && localUserChats.length === 0 && (
                      <div className='flex flex-col items-center'>
                        <p className='text-gray-400 text-sm'>
                          No tienes chats iniciados con nadie.
                        </p>
                      </div>
                    )}
                    {chats[0] === 'loading' && (
                      <div className='flex flex-col items-center'>
                        <Loader />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
