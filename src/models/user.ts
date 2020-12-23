import { firebase } from 'services/firebase'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password?: string
  city?: string
  country?: string
  avatar?: string
  reputation?: number
  position?: string
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
}
