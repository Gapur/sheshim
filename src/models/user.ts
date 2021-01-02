import { firebase } from 'services/firebase'
import { Sheshimim } from 'models'
import { FormValues } from 'screens/auth/sign-up/components/sign-up-form'

export interface User {
  id?: string
  authId: string
  name: string | null
  email: string
  city?: string
  country?: string
  avatar?: string | null
  reputation?: number
  position?: string
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
}

export interface UserWithSheshims extends User {
  sheshims: Sheshimim[]
}

export const parseUser = (doc: firebase.firestore.DocumentSnapshot) => {
  const sheshim = doc.data() as User
  return {
    ...sheshim,
    id: doc.id,
    sheshims: [],
  } as UserWithSheshims
}

export const createInitialUser = (user: firebase.auth.UserCredential, data: FormValues) => ({
  authId: user.user?.uid as string,
  name: user.user?.displayName ?? data.name,
  email: user.user?.email ?? data.email,
  avatar: user.user?.photoURL,
  reputation: 0,
  city: 'Somewhere',
  country: 'World',
  position: 'Not Bot',
})
