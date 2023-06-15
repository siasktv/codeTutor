import { useState, useEffect } from 'react'
// import '../testLoginPage.css'
import {
  signUp,
  uploadImage,
  signIn,
  signOut,
  loginWithGoogle
} from '../firebase/client'
import useUser from '../hooks/useUser'
import axios from 'axios'

function TestLoginPage () {
  const [emailSignup, setEmailSignup] = useState('')
  const [passwordSignup, setPasswordSignup] = useState('')
  const [nameSignup, setNameSignup] = useState('')
  const [imageSignup, setImageSignup] = useState('')
  const [emailLogin, setEmailLogin] = useState('')
  const [passwordLogin, setPasswordLogin] = useState('')
  const [selectedSection, setSelectedSection] = useState('signup')
  const [errors, setErrors] = useState({
    avatar: ''
  })
  const [signUpError, setSignUpError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [isDisabledLogin, setIsDisabledLogin] = useState(true)
  const [isDisabledSignup, setIsDisabledSignup] = useState(true)
  const [isDisabledGoogle, setIsDisabledGoogle] = useState(false)
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState('')

  useEffect(() => {
    const getLocations = async () => {
      try {
        const { data } = await axios.get('http://localhost:3001/api/locations')
        setLocations(data)
      } catch (error) {
        console.log(error)
      }
    }
    getLocations()
  }, [])

  useEffect(() => {
    if (
      emailSignup === '' ||
      passwordSignup === '' ||
      nameSignup === '' ||
      selectedLocation === '' ||
      selectedTimezone === ''
    ) {
      setIsDisabledSignup(true)
    } else {
      setIsDisabledSignup(false)
    }
  }, [
    errors,
    emailSignup,
    passwordSignup,
    nameSignup,
    selectedLocation,
    selectedTimezone
  ])

  const user = useUser()

  const handleSignUp = async () => {
    setIsDisabledSignup(true)
    try {
      await signUp(
        emailSignup,
        passwordSignup,
        nameSignup,
        selectedLocation,
        selectedTimezone,
        imageSignup
      )
      setSignUpError('')
      setEmailSignup('')
      setPasswordSignup('')
      setNameSignup('')
      setImageSignup('')
      setErrors({ ...errors, avatar: '' })
      setLoginError('')
    } catch (error) {
      setIsDisabledSignup(false)
      if (error.code === 'auth/email-already-in-use') {
        setSignUpError('El correo electrónico ya está en uso')
      } else if (error.code === 'auth/invalid-email') {
        setSignUpError('El correo electrónico no es válido')
      } else if (error.code === 'auth/weak-password') {
        setSignUpError('La contraseña debe tener al menos 6 caracteres')
      } else {
        setSignUpError(error.message)
      }
    }
  }

  const handleLogout = async () => {
    await signOut()
    setIsDisabledLogin(true)
    setIsDisabledSignup(true)
    setIsDisabledGoogle(false)
  }

  const handleUploadImage = async e => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    if (
      !file.type.includes('image/png') &&
      !file.type.includes('image/jpeg') &&
      !file.type.includes('image/jpg')
    ) {
      setErrors({
        ...errors,
        avatar: 'Por favor, selecciona un archivo de imagen válido'
      })

      return
    }
    // check if file is larger than 5mb
    if (file.size > 5000000) {
      setErrors({
        ...errors,
        avatar: 'El archivo no puede ser mayor a 5MB'
      })

      return
    }
    try {
      const task = uploadImage(file)
      task.on(
        'state_changed',
        snapshot => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          // if there is an error, console.log it
          console.log(error)
        },
        () => {
          // when the image is uploaded, get the url and set it to imageURL and input.image
          task.snapshot.ref.getDownloadURL().then(url => {
            setImageSignup(url)
            setErrors({ ...errors, avatar: '' })
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async () => {
    setIsDisabledLogin(true)
    try {
      await signIn(emailLogin, passwordLogin)
      setSignUpError('')
      setEmailSignup('')
      setPasswordSignup('')
      setNameSignup('')
      setImageSignup('')
      setErrors({ ...errors, avatar: '' })
      setLoginError('')
    } catch (error) {
      setIsDisabledLogin(false)
      if (error.code === 'auth/user-not-found') {
        setLoginError('El usuario no existe')
      } else if (error.code === 'auth/wrong-password') {
        setLoginError('La contraseña es incorrecta')
      } else if (error.code === 'auth/invalid-email') {
        setLoginError('El correo electrónico no es válido')
      } else {
        setLoginError(error.message)
      }
    }
  }

  const handleLoginWithGoogle = async () => {
    setIsDisabledGoogle(true)
    try {
      await loginWithGoogle()
    } catch (error) {
      console.log(error)
      setIsDisabledGoogle(false)
    }
  }

  useEffect(() => {
    emailLogin === '' || passwordLogin === ''
      ? setIsDisabledLogin(true)
      : setIsDisabledLogin(false)
  }, [emailLogin, passwordLogin])

  return (
    <div>
      {user === undefined && (
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      )}
      {user === null && (
        <div className="flex flex-col items-center justify-center">
          <div className='selector '>
            <button onClick={() => setSelectedSection('signup')}>
              Sign Up
            </button>
            <button onClick={() => setSelectedSection('login')}>Login</button>
          </div>

          {selectedSection === 'signup' && (
            <div id='signUpForm' className='signup bg-white shadow rounded lg:w-1/2  md:w-1/2 w-full p-10 mt-16 '>
              <h1>Sign Up</h1>
              <label>Image</label>
              {imageSignup && (
                <img src={imageSignup} alt='avatar' className='avatar' />
              )}
              <label htmlFor='image' className='imgLabel'>
                {imageSignup ? 'Change image' : 'Upload image'}
              </label>
              <input
                type='file'
                id='image'
                name='image'
                placeholder='Image'
                accept='image/png, image/jpeg, image/jpg'
                className='imgInput'
                onChange={handleUploadImage}
              />
              {errors.avatar && <p className='error'>{errors.avatar}</p>}
              <label htmlFor='name'>Name</label>
              <input
                type='text'
                id='name'
                name='name'
                placeholder='Name'
                onChange={e => setNameSignup(e.target.value)}
              />
              <label htmlFor='location'>Location</label>
              <select
                onChange={e => setSelectedLocation(e.target.value)}
                className='select'
              >
                <option value='' disabled selected>
                  Select a location
                </option>
                {locations.map(location => (
                  <option value={location.name} key={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <label htmlFor='timezone'>Timezone</label>
              <select
                onChange={e => setSelectedTimezone(e.target.value)}
                className='select'
                disabled={!selectedLocation}
              >
                <option value='' disabled selected>
                  Select a timezone
                </option>
                {selectedLocation &&
                  locations
                    .find(location => location.name === selectedLocation)
                    .timezones.map(timezone => (
                      <option value={timezone} key={timezone}>
                        {timezone}
                      </option>
                    ))}
              </select>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                onChange={e => setEmailSignup(e.target.value)}
              />
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                onChange={e => setPasswordSignup(e.target.value)}
              />
              <button onClick={handleSignUp} disabled={isDisabledSignup}>
                Sign Up
              </button>
              {signUpError && <p className='error'>{signUpError}</p>}
            </div>
          )}
          {selectedSection === 'login' && (
            <div id='loginForm' className='login bg-white shadow rounded lg:w-1/2  md:w-1/2 w-full p-10 mt-16'>
              <h1>Login</h1>
              <label className='block text-lg' htmlFor='email'>Email</label>
              <input
                className='block mb-1 text-xl font-medium  text-gray-700'
                type='email'
                id='email'
                name='email'
                placeholder='Email'
                onChange={e => setEmailLogin(e.target.value)}
              />
              <label htmlFor='password'>Password</label>
              <input
                className='block mb-1 text-xl font-medium text-gray-700'
                type='password'
                id='password'
                name='password'
                placeholder='Password'
                onChange={e => setPasswordLogin(e.target.value)}
              />
              <button onClick={handleLogin} disabled={isDisabledLogin}>
                Login
              </button>
              {loginError && <p className='error'>{loginError}</p>}
              <button
            onClick={handleLoginWithGoogle}
            disabled={isDisabledGoogle}
            className='googleBtn'
          >
            Login with Google
          </button>
            </div>
          )}
          
        </div>
      )}
      {user && (
        <div className='user'>
          <h1>Welcome {user.fullName}</h1>
          <img
            src={user.image}
            alt=''
            className='avatar'
            referrerPolicy='no-referrer'
          />
          <p>{user.email}</p>
          <p>
            {user.location} ({user.timezone})
          </p>
          <p>{user.uid}</p>
          <p>{user.role}</p>
          <button onClick={handleLogout}>Sign Out</button>
        </div>
      )}
    </div>
  )
}

export default TestLoginPage
