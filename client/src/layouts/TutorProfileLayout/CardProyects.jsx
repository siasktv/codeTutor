import {
  ProyectNameLink,
  TechnicalSkillsProyectTutor,
  DescriptionProyectTutor
} from '../../components'

const CardProyects = () => {
  return (
    <div>
      {/* Proyectos */}
      <div className='pt-6 pb-6 flex justify-between items-center space-x-6'>
        <div className='flex items-center'>
          <ProyectNameLink />
        </div>
      </div>

      {/* Habilidades técnicas trabajadas en el proyecto */}
      <div className='grid grid-cols-5 gap-3'>
        <TechnicalSkillsProyectTutor />
      </div>

      {/* Descripción del Proyecto */}
      <div className='pt-6 pb-6'>
        <DescriptionProyectTutor />
      </div>
    </div>
  )
}
export default CardProyects
