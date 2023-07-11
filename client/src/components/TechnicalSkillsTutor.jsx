/* eslint-disable react/prop-types */
const TechnicalSkillsTutor = (props) => {
  return (
    <>
      {props.skills.map((skill) => (
        <span
          className="flex pt-1 pb-1 w-auto text-xs dark:bg-codecolor dark:text-codecolorlighter lg:h-8 max-lg:my-1 max-lg:mx-1 max-lg:px-2 max-lg:py-1 justify-center items-center font-bold  text-codecolor bg-[#7D5AE21A] rounded transition duration-1 ease-in-out transform active:outline-none focus:outline-none"
          key={skill._id}
        >
          {skill.techName.name}
        </span>
      ))}
    </>
  )
}
export default TechnicalSkillsTutor
