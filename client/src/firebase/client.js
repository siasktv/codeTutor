import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import axios from 'axios'
import firebaseConfig from './firebase-config'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // make get request until user is found
      function getUser () {
        axios.get(`${BACKEND_URL}/api/users/${user.uid}`).then(res => {
          if (!res.data?.uid) {
            return getUser()
          }
          onChange({
            id: res.data._id,
            uid: user.uid,
            email: user.email,
            role: res.data.role,
            fullName: res.data.fullName,
            image: res.data.image,
            location: res.data.location,
            timezone: res.data.timezone,
            tutor: res.data?.tutor,
            admin: res.data?.admin
          })
        })
      }
      return getUser()
    } else {
      onChange(null)
    }
  })
}

export const uploadImage = file => {
  const storageRef = firebase.storage().ref()
  const fileRef = storageRef.child(file.name)
  const task = fileRef.put(file)
  return task
}

export const signUp = (email, password, name) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      axios
        .post(`${BACKEND_URL}/api/users`, {
          fullName: name,
          email,
          image:
            'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/default.jpg?alt=media&token=a00c43ae-f17a-4846-af97-57d034696532.png',
          location: '',
          timezone: '',
          role: 'Client',
          uid: user.user.uid
        })
        .then(res => {
          return user
        })
        .catch(err => console.log(err))
    })
}

export const signIn = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = () => {
  return firebase.auth().signOut()
}

export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(user => {
      axios
        .get(`${BACKEND_URL}/api/users/${user.user.uid}`)
        .then(res => {
          if (res.data) {
            return user
          } else {
            axios
              .post(`${BACKEND_URL}/api/users`, {
                fullName: user.user.displayName,
                email: user.user.email,
                image: user.user.photoURL.replaceAll('s96-c', 's1080-c'),
                location: '',
                timezone: '',
                role: 'Client',
                uid: user.user.uid
              })
              .then(res => {
                return user
              })
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    })
}

export const validateOobCode = oobCode => {
  return firebase.auth().verifyPasswordResetCode(oobCode)
}

export const resetPassword = (oobCode, newPassword) => {
  return firebase.auth().confirmPasswordReset(oobCode, newPassword)
}

export const updatePassword = (previusPassword, newPassword) => {
  const user = firebase.auth().currentUser
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    previusPassword
  )
  return user.reauthenticateWithCredential(credential).then(() => {
    return user.updatePassword(newPassword)
  })
}
export const updateEmail = (previusPassword, newEmail) => {
  const user = firebase.auth().currentUser
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    previusPassword
  )
  return user.reauthenticateWithCredential(credential).then(() => {
    return user.updateEmail(newEmail)
  })
}
