import { Node as SlateNode } from 'slate'

import { firebase } from 'services/firebase'
import { now } from 'services/firebase/collection-manager'

import { Comment } from './comment'

export interface Answer {
  votes: number
  body: string
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
  createdBy: {
    id: string
    name: string
  }
  comments: Comment[]
}

export interface SheshimAnswer extends Omit<Answer, 'body'> {
  body: SlateNode[]
}

export const createInitialAnswer = (data: SlateNode[], user: firebase.User) => ({
  votes: 0,
  body: JSON.stringify(data),
  createdBy: {
    id: user.uid,
    name: user.displayName ?? user.email ?? 'Anonymous',
  },
  createdAt: now(),
  updatedAt: now(),
  comments: [],
})
