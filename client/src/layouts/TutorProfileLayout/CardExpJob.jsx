import ExpJobTutor from "../../components/ExpJobTutor";
import CountryJobTutor from "../../components/CountryJobTutor";
import CompanyJobTutor from "../../components/CompanyJobTutor";
import TechnicalSkillsJobTutor from "../../components/TechnicalSkillsJobTutor";
import DescriptionJobTutor from "../../components/DescriptionJobTutor";

const CardReviewUser = () => {
    return (
        <div>
           {    /* Experiencias */}
            <div className="pt-6 pb-6 flex justify-between items-center space-x-6">
                <div className='flex items-cent'>
                  <ExpJobTutor/>
                </div>
              </div>

              {/* País y Empresa */}
              <div className=" pb-6 flex justify-start items-center">
                {/* Los svg y span contienen iconos */}
                <img src="./src/assets/Pais.svg"/>
                {/* País */}
                <CountryJobTutor/>

                <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">
                  ◦
                </span>

                <img src="./src/assets/Calendario.svg"/>
                {/* Empresa */}
                <CompanyJobTutor/>
              </div>

              {/* Habilidades técnicas trabajadas en el trabajo */}
              <div className="grid grid-cols-4 gap-3">
                <TechnicalSkillsJobTutor/>
              </div>

              {/* Descripción trabajo del tutor */}
              <div className="pt-6 pb-6">
                <DescriptionJobTutor/>
            </div>
        </div>
    )
}
export default CardReviewUser;