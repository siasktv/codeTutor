import { LinkGitHub, LinkLinkedIn } from '../index'

const TutorFormDataLeft = () => {
  return (
    <div className="bg-white items-center h-[450px] justify-center p-[50px] rounded-[8px] border border-[#1414140D] ">
      <div className="rounded-full items-center justify-center w-[145px] h-[145px] bg-[#D9D9D9]"></div>
      <p className="font-inter font-medium text-xl leading-[37.5px] mt-8">
        Shi Juan
      </p>
      <div className="flex justify-center gap-8 mt-8">
        <LinkGitHub />
        <LinkLinkedIn />
      </div>
    </div>
  )
}

export default TutorFormDataLeft
