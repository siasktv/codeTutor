import { GitHub } from '../assets'
const LinkGitHub = props => {
  const { link } = props
  return (
    <a
      href={link ? link : null}
      target='_blank'
      className='transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none cursor-pointer'
    >
      <img
        src={GitHub}
        className='hover:filter hover:brightness-50 transition duration-300 ease-in-out transform'
        alt='GitHub'
      />
    </a>
  )
}
export default LinkGitHub
