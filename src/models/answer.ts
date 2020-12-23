import { Node as SlateNode } from 'slate'

import { firebase } from 'services/firebase'

import { Comment } from './comment'

export interface Answer {
  id: string
  votes: number
  body: SlateNode[]
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
  createdBy: {
    id: string
    name: string
  }
  comments: Comment[]
}
