import ProyectNameLink from "../../components/ProyectNameLink";
import TechnicalSkillsProyectTutor from "../../components/TechnicalSkillsProyectTutor";
import DescriptionProyectTutor from "../../components/DescriptionProyectTutor";

const CardProyects = () => {
    return (
        <div>
            {/* Proyectos */}
            <div className="pt-6 pb-6 flex justify-between items-center space-x-6">
                <div className="flex items-center">
                    <ProyectNameLink/>
                </div>
            </div>

            {/* Habilidades técnicas trabajadas en el proyecto */}
            <div className="grid grid-cols-4 gap-3">
                <TechnicalSkillsProyectTutor/>
            </div>

            {/* Descripción del Proyecto */}
            <div className="pt-6 pb-6">
                <DescriptionProyectTutor/>
            </div>
        </div>
    )
}
export default CardProyects;