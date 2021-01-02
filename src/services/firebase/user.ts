import { User, parseUser, createInitialUser, parseSheshim, UserWithSheshims } from 'models'
import { FormValues as SignUpValues } from 'screens/auth/sign-up/components/sign-up-form'
import { FormValues as ProfileValues } from 'screens/profile/components/profile-form'

import { firebase } from './firebase'
import { CollectionManager } from './collection-manager'
import { sheshimCollection } from './sheshim'

export const userCollection = new CollectionManager('users')

export const createUser = (user: firebase.auth.UserCredential, data?: SignUpValues) => {
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
    return userCollection
      .getDoc(id)
      .then((doc) => (doc.exists ? parseUser(doc) : null))
      .then((user: UserWithSheshims | null) => {
        if (user) {
          return getUserSheshims(user.authId).then((sheshims) => ({ ...user, sheshims }))
        }
        return user
      })
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const getUserSheshims = (userId: string) =>
  sheshimCollection
    .where('createdBy.id', '==', userId)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return []
      }
      return snapshot.docs.map(parseSheshim)
    })

export const getProfile = async () => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return userCollection
      .where('authId', '==', currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.empty || snapshot.docs.length > 1) {
          return Promise.reject(new Error('Something is wrong with your profile data.'))
        }
        const [userProfile] = snapshot.docs
        return parseUser(userProfile)
      })
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const updateProfile = (userId: string, data: ProfileValues) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return userCollection.updateDoc(userId, data as User)
  }
  return Promise.reject(new Error('You are not signed in.'))
}
