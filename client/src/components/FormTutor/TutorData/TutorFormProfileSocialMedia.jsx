import { CardTutorData } from '../../index'

const TutorFormProfileSocialMedia = () => {
  return (
    <>
      <CardTutorData title="Actualizar Social Media">
        <input
          id="inputField"
          className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
          type="link"
          placeholder="Github Link"
        />
        <input
          id="inputField"
          className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
          type="link"
          placeholder="Linkedin Link"
        />
      </CardTutorData>
    </>
  )
}

{
  /* <input
id="inputField"
className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
type="link"
placeholder="Github Link"
/>
<input
id="inputField"
className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
type="link"
placeholder="Linkedin Link"
/> */
}

export default TutorFormProfileSocialMedia
