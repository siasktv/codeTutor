/* eslint-disable react/prop-types */
const TechnicalSkillsTutor = (props) => {
  
  return (
        <>
      {props.skills.map((skill) => (
        <span className="flex pt-1 pb-1 h-14 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none" key={skill._id}>
          {skill.techName.name}
        </span>
      ))}
    </>
  );
}
export default TechnicalSkillsTutor;