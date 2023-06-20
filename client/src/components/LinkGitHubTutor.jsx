import { GitHub } from '../assets'
const LinkGitHub = props => {
  const { link } = props
  return (
    <a
      href={link}
      target='_blank'
      className='transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
    >
      <img src={GitHub} />
    </a>
  )
}
export default LinkGitHub
