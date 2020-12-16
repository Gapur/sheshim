import { firebase } from './firebase'

import { FormValues as SignUpValues } from 'screens/auth/sign-up/components/sign-up-form'
import { FormValues as LogInValues } from 'screens/auth/log-in/components/log-in-form'

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

export const logout = () => firebase.auth().signOut()
