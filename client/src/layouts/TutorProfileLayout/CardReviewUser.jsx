import {
  PictureUserReviewTutor,
  NameUserReviewTutor,
  DescriptionUserReviewTutor,
  DateUserReviewTutor
} from '../../components'

const CardReviewUser = (props) => {
  const { tutor } = props;
  console.log(tutor)
  return (
    <div>
      {/* Card opinion */}
      <div className='pb-4 flex'>
        {/* Imagen de Perfil */}
        <PictureUserReviewTutor />
        {/* Nombre y opinión */}
        <div className='pl-4 flex-grow'>
          <div>
            <NameUserReviewTutor />
            <DescriptionUserReviewTutor />
          </div>
        </div>
        {/* Fecha */}
        <div className='pl-4 flex'>
          <DateUserReviewTutor />
        </div>
      </div>
    </div>
  )
}
export default CardReviewUser
