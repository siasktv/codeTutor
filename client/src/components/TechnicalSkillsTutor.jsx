/* eslint-disable react/prop-types */
const TechnicalSkillsTutor = (props) => {
    return (
        <span className="flex pt-1 pb-1 h-14 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
            {props.skills}
        </span>
    )
}
export default TechnicalSkillsTutor;