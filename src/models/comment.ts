import { firebase } from 'services/firebase'

export interface Comment {
  id?: string
  votes: number
  text: string
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
  createdBy: {
    id: string
    name: string
  }
}
