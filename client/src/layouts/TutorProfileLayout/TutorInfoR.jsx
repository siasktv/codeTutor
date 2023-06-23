/* eslint-disable react/prop-types */
import {
  AreaTutor3xl,
  CountryTutor,
  LanguageTutor,
  DescriptionTutor,
  TechnicalSkillsTutor,
  ButtonShowMore,
  PriceHourGray,
} from '../../components'
<<<<<<< HEAD
import { CardReviewUser, CardExperience, CardProyects } from '../';
=======
import { CardReviewUser, CardExperience, CardProyects } from '../'
>>>>>>> fc1ecddd0b7bd740841f59d707e3d5dc708b78fd

import { Pais, Moneda, Mensaje, Star } from '../../assets'

const TutorInfoR = (props) => {
  const { tutor } = props
  console.log(tutor)
  const reviewCount = tutor.reviews ? tutor.reviews.length : 0
  const totalRatings = tutor.reviews
    ? tutor.reviews.reduce((total, review) => {
        if (!isNaN(review.rating)) {
          return total + review.rating
        }
        return total
      }, 0)
    : 0
  const averageRating = reviewCount > 0 ? totalRatings / reviewCount : 0

  return (
    <div className="w-full pl-9 flex flex-col relative z-0">
      <div className="p-20 bg-white border border-gray-200 shadow-md rounded-lg">
        {/* Area del Developer */}
        <div>
          <AreaTutor3xl />
        </div>

        {/* Contenedor de País,Tarifa e Idiomas */}
        <div className="pt-6 pb-6 flex justify-start items-center">
          {/* Los svg y span contienen iconos */}
          <img src={Pais} />
          {/* País */}
          <CountryTutor location={tutor.user.location} />

          <span className="pl-4 pr-4 font-semibold text-sm text-[#141414B2]">
            ◦
          </span>

          <img src={Moneda} />
          {/* Tarifa */}
          <PriceHourGray rates={tutor.rates[0].value} />

          <span className="pl-4 pr-4 font-semibold text-sm text-[#141414B2]">
            ◦
          </span>

          <img src={Mensaje} />
          {/* Idiomas */}
          <LanguageTutor languages={tutor.languages} />
        </div>

        {/* Descripción del tutor */}
        <div className="pt-2 pb-6 border-b">
          <DescriptionTutor description={tutor.bio.description} />
        </div>

        {/* Cuadro de Habilidades Técnicas */}
        <div className="pt-6 pb-6">
          <h2 className="text-left text-xl font-bold">Habilidades Técnicas</h2>
        </div>
        <div className="pb-6 border-b">
          <div className="grid grid-cols-5 gap-3">
            <TechnicalSkillsTutor skills={tutor.skills} />
          </div>
        </div>

        {/* Valoraciones */}
        <div className="pb-6 border-b">
          <div className="pt-6">
            <h2 className="text-left text-xl font-bold">Reviews</h2>
          </div>
          <div className="pt-6 pb-6 flex justify-between items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img src={Star} />
              {/* Puntuación */}
              <h2 className="font-semibold text-lg text-codecolor">
                {Math.round(averageRating)}
              </h2>
            </div>
            {/* Reviews */}
            {tutor.reviews && (
              <h2 className="font-semibold text-gray-600">
                {tutor.reviews.length} Reviews
              </h2>
            )}
          </div>

          {/* Contenedor de opiniones */}

          <div>
            <CardReviewUser reviews={tutor.reviews} />
          </div>

          {/* Boton ver más opiniones */}
          {/* <div className="flex flex-col items-center pt-6">
            <ButtonShowMore />
          </div> */}
        </div>

        {/* Experiencia Laboral */}
        <div className="pb-6 border-b">
          {/* Título */}
          <div className="pt-6">
            <h2 className="text-left text-xl font-bold">Experiencia Laboral</h2>
          </div>

          {/* Card Experiencias */}
          <CardExperience experience={tutor.experience} />
<<<<<<< HEAD
          
=======
>>>>>>> fc1ecddd0b7bd740841f59d707e3d5dc708b78fd

          {/* Boton ver más Experiencias laborales */}
          {/* <div className="flex flex-col items-center pt-6">
            <ButtonShowMore />
          </div> */}
        </div>

        {/* Experiencia en Proyectos */}
        <div className="pb-6">
          {/* Título */}
          <div className="pt-6">
            <h2 className="text-left text-xl font-bold">Proyectos</h2>
          </div>

          {/* Card Proyectos */}
          <CardProyects projects={tutor.projects} />

          {/* Boton ver más Proyectos */}
          {/* <div className="flex flex-col items-center pt-6">
            <ButtonShowMore />
          </div> */}
        </div>
      </div>
    </div>
  )
}
export default TutorInfoR
