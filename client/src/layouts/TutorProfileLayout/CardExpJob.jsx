import {
  ExpJobTutor,
  CountryJobTutor,
  CompanyJobTutor,
  TechnicalSkillsJobTutor,
  DescriptionJobTutor
} from '../../components'

import { Pais, Calendario } from '../../assets'

const CardReviewUser = () => {
  return (
    <div>
      {/* Experiencias */}
      <div className='pt-6 pb-6 flex justify-between items-center space-x-6'>
        <div className='flex items-cent'>
          <ExpJobTutor />
        </div>
      </div>

      {/* País y Empresa */}
      <div className=' pb-6 flex justify-start items-center'>
        {/* Los svg y span contienen iconos */}
        <img src={Pais} />
        {/* País */}
        <CountryJobTutor />

        <span className='pl-4 pr-4 font-semibold text-sm text-gray-600'>◦</span>

        <img src={Calendario} />
        {/* Empresa */}
        <CompanyJobTutor />
      </div>

      {/* Habilidades técnicas trabajadas en el trabajo */}
      <div className='grid grid-cols-4 gap-3'>
        <TechnicalSkillsJobTutor />
      </div>

      {/* Descripción trabajo del tutor */}
      <div className='pt-6 pb-6'>
        <DescriptionJobTutor />
      </div>
    </div>
  )
}
export default CardReviewUser
