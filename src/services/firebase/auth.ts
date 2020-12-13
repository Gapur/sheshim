import { firebase } from './firebase'

import { FormValues as SignUpValues } from 'screens/auth/sign-up/components/sign-up-form'

export const signUpWithEmailAndPassword = async (userData: SignUpValues) => {
  const { email, password } = userData
  console.log('user: ', userData)

  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => JSON.stringify(res))
    .then((res) => JSON.parse(res))
}
