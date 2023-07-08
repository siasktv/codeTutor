import { LinkedIn } from '../assets'
const LinkLinkedIn = props => {
  const { link } = props
  return (
    <a
      href={link ? link : null}
      target='_blank'
      className='transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none cursor-pointer'
    >
      <img
        src={LinkedIn}
        className='hover:filter hover:brightness-50 dark:hover:brightness-75 transition duration-300 ease-in-out transform'
        alt='LinkedIn'
      />
    </a>
  )
}
export default LinkLinkedIn
