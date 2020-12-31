import { firebase } from 'services/firebase'
import { FormValues } from 'screens/auth/sign-up/components/sign-up-form'

export interface User {
  id: string
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

export const parseUser = (doc: firebase.firestore.DocumentSnapshot) => {
  const sheshim = doc.data() as User
  return {
    ...sheshim,
    id: doc.id,
  } as User
}

export const createInitialUser = (user: firebase.auth.UserCredential, data: FormValues) => ({
  id: user.user?.uid as string,
  name: user.user?.displayName ?? data.name,
  email: user.user?.email ?? data.email,
  avatar: user.user?.photoURL,
  reputation: 0,
  city: 'Somewhere',
  country: 'World',
  position: 'Not Bot',
})
