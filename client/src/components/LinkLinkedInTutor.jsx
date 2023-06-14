import { LinkedIn } from '../assets'
const LinkLinkedIn = () => {
  return (
    <a
      href='https://www.linkedin.com'
      target='_blank'
      className='transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
    >
      <img src={LinkedIn} />
    </a>
  )
}
export default LinkLinkedIn
