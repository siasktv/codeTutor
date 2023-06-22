// import {
//   PictureUserReviewTutor,
//   NameUserReviewTutor,
//   DescriptionUserReviewTutor,
//   DateUserReviewTutor,
// } from '../../components'

const CardReviewUser = (props) => {
  const { reviews } = props
  console.log('CardReviewUser', reviews)
  return (
    <div>
      {/* Card opinion */}
      <div className="pb-4 flex">
        {/* Imagen de Perfil */}
        <img
          src="https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/02/henry-cavill-2624275.jpg?tf=3840x"
          alt="Imagen de perfil Tutor"
          className="w-20 h-20 rounded-full object-cover transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none"
        />
        {/* Nombre y opinión */}
        <div className="pl-4 flex-grow">
          <div>
            <h2 className="text-left font-semibold">Cavill Henry</h2>
            <h2 className="font-semibold text-sm text-justify">
              Deje el mundo del espectáculo para dedicarme a mi otra
              pasión...dormir. Ah y también a programar. Mollit in laborum
              tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint
              culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem
              incididunt. Deje el mundo del espectaculo para dedicarme a mi otra
              pasión...el skate. Ah y también a programar. Mollit in laborum
              tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint
              culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem
              incididunt.
            </h2>
          </div>
        </div>
        {/* Fecha */}
        <div className="pl-4 flex">
          <h2 className="font-semibold text-sm text-gray-600 w-16">Mayo, 15</h2>
        </div>
      </div>
    </div>
  )
}
export default CardReviewUser
