import { firebase } from './firebase'

import { FormValues as SignUpValues } from 'screens/auth/sign-up/components/sign-up-form'
import { FormValues as LogInValues } from 'screens/auth/log-in/components/log-in-form'
import { FormValues as ForgotValues } from 'screens/auth/forgot-password/components/forgot-password-form'

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

export const signUpWithEmailAndPassword = async (userData: SignUpValues) => {
  const { email, password } = userData

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => JSON.stringify(res))
    .then((res) => JSON.parse(res))
}

export const forgotPassword = ({ email }: ForgotValues) =>
  firebase.auth().sendPasswordResetEmail(email)

export const loginWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth().signInWithPopup(googleProvider)
}

export const loginWithFacebook = () => {
  const facebookProvider = new firebase.auth.FacebookAuthProvider()
  return firebase.auth().signInWithPopup(facebookProvider)
}

export const logout = () => firebase.auth().signOut()
