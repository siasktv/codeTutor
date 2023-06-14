const TutorProfilePicture = () => {
    return (
        <div className="w-40 h-40 rounded-full overflow-hidden transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none">
          <img 
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_oFhoPdG_gvarQsjy33Dwov47ETNFjw3Sg&usqp=CAU'
            alt="Imagen de perfil Tutor" 
            className="w-full h-full object-cover"
          />
        </div>
    )
}
export default TutorProfilePicture;