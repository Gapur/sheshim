import { firebase } from 'services/firebase'

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
