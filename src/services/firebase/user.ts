import { User } from 'models'
import { FormValues as SignUpValues } from 'screens/auth/sign-up/components/sign-up-form'

import { firebase } from './firebase'
import { CollectionManager } from './collection-manager'

export const userCollection = new CollectionManager('users')

export const createUser = (user: firebase.auth.UserCredential, data: SignUpValues) => {
  const newUser: User = {
    id: user.user?.uid as string,
    name: user.user?.displayName ?? data.name,
    email: user.user?.email ?? data.email,
    avatar: user.user?.photoURL,
    reputation: 0,
  }
  return userCollection.addDoc(newUser)
}
