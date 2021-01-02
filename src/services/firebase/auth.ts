import { FormValues as SignUpValues } from 'screens/auth/sign-up/components/sign-up-form'
import { FormValues as LogInValues } from 'screens/auth/log-in/components/log-in-form'
import { FormValues as ForgotValues } from 'screens/auth/forgot-password/components/forgot-password-form'

import { firebase } from './firebase'
import { createUser, userCollection } from './user'

export const onAuthStateChanged = (
  successFn: (user: firebase.User) => void,
  failureFn: () => void,
) =>
  firebase
    .auth()
    .onAuthStateChanged((user: firebase.User | null) => (user ? successFn(user) : failureFn()))

export const loginWithEmailAndPassword = async ({ email, password }: LogInValues) =>
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => JSON.stringify(res))
    .then((res) => JSON.parse(res))

export const signUpWithEmailAndPassword = async (data: SignUpValues) => {
  const { email, password } = data

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => JSON.stringify(res))
    .then((res) => JSON.parse(res))
    .then((user: firebase.auth.UserCredential) => createUser(user, data))
}

export const forgotPassword = ({ email }: ForgotValues) =>
  firebase.auth().sendPasswordResetEmail(email)

export const loginWithGoogle = async () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider).then(createUserWithGoogleOrFacebook)
}

export const loginWithFacebook = async () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider()
  return firebase.auth().signInWithPopup(facebookProvider).then(createUserWithGoogleOrFacebook)
}

const createUserWithGoogleOrFacebook = (user: firebase.auth.UserCredential) =>
  userCollection
    .where('authId', '==', user.user?.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return createUser(user).then(() => user)
      }
      return user
    })

export const logout = () => firebase.auth().signOut()
