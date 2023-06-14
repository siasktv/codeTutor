import TutorInfoI from "../layouts/TutorProfileLayout/TutorInfoL";
import TutorInfoD from "../layouts/TutorProfileLayout/TutorInfoR";

const TutorProfile = () => {
  return (
    <div className="bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0">
      {/* Tabla de información Izquierda */}
      <TutorInfoI/>
      {/* Tabla de Información Derecha */}
      <TutorInfoD/>
    </div>
  )
}
export default TutorProfile;