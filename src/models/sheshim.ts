import { Node as SlateNode } from 'slate'

import { firebase } from 'services/firebase'
import { FormValues } from 'screens/sheshim/sheshim-create/components/sheshim-form'

import { Answer } from './answer'
import { Comment } from './comment'

export interface Sheshim {
  id?: string
  title: string
  tags: string[]
  votes: number
  views: number
  body: string
  createdAt?: firebase.firestore.Timestamp
  updatedAt?: firebase.firestore.Timestamp
  createdBy?: {
    id: string
    name: string
  }
  answers: Answer[]
  comments: Comment[]
}

export interface Sheshimim extends Omit<Sheshim, 'body'> {
  body: SlateNode[]
}

export const createInitialSheshim = (data: FormValues, user: firebase.User) => ({
  title: data.title,
  tags: data.tags,
  body: JSON.stringify(data.body),
  votes: 0,
  views: 0,
  answers: [],
  comments: [],
  createdBy: {
    id: user.uid,
    name: user.displayName ?? user.email ?? 'Anonymous',
  },
})

export const parseSheshim = (doc: firebase.firestore.DocumentSnapshot) => {
  const sheshim = doc.data() as Sheshim
  return {
    ...sheshim,
    id: doc.id,
    body: JSON.parse(sheshim.body),
  } as Sheshimim
}
