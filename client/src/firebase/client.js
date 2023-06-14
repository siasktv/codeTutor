import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import axios from 'axios'
import firebaseConfig from './firebase-config'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // make get request until user is found
      function getUser () {
        axios.get(`http://localhost:3001/api/users/${user.uid}`).then(res => {
          if (!res.data?.uid) {
            return getUser()
          }
          onChange({
            uid: user.uid,
            email: user.email,
            role: res.data.role,
            fullName: res.data.fullName,
            image: res.data.image,
            location: res.data.location,
            timezone: res.data.timezone
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

export const signUp = (email, password, name, location, timezone, image) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      axios
        .post('http://localhost:3001/api/users', {
          fullName: name,
          email,
          image,
          location,
          timezone,
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
        .get(`http://localhost:3001/api/users/${user.user.uid}`)
        .then(res => {
          if (res.data) {
            return user
          } else {
            axios
              .post('http://localhost:3001/api/users', {
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
