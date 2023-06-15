import { GitHub } from '../assets'
const LinkGitHub = () => {
  return (
    <a
      href='https://github.com/ '
      target='_blank'
      className='transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
    >
      <img src={GitHub} />
    </a>
  )
}
export default LinkGitHub
