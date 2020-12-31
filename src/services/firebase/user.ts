import { User, parseUser, createInitialUser } from 'models'
import { FormValues as SignUpValues } from 'screens/auth/sign-up/components/sign-up-form'

import { firebase } from './firebase'
import { CollectionManager } from './collection-manager'

export const userCollection = new CollectionManager('users')

export const createUser = (user: firebase.auth.UserCredential, data: SignUpValues) => {
  const newUser: User = createInitialUser(user, data)
  return userCollection.addDoc(newUser)
}

export const fetchUsers = async () => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return userCollection
      .collectionRef()
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => (snapshot.empty ? [] : snapshot.docs.map(parseUser)))
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const getUser = async (id: string) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return userCollection.getDoc(id).then((doc) => (doc.exists ? parseUser(doc) : null))
  }
  return Promise.reject(new Error('You are not signed in.'))
}
