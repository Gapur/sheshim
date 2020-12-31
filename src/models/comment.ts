import { firebase } from 'services/firebase'
import { now } from 'services/firebase/collection-manager'
import { FormValues } from 'screens/sheshim/sheshim-details/components/sheshim-comment-form'

export interface Comment {
  votes: number
  text: string
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
  createdBy: {
    id: string
    name: string
    avatar: string | null
  }
}

export const creatInitialComment = (data: FormValues, user: firebase.User) => ({
  text: data.comment,
  votes: 0,
  createdBy: {
    id: user.uid,
    name: user.displayName ?? user.email ?? 'Anonymous',
    avatar: user.photoURL,
  },
  createdAt: now(),
  updatedAt: now(),
})
