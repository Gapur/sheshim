import { Node as SlateNode } from 'slate'

import { Comment } from './comment'

export interface Answer {
  id: string
  votes: number
  body: SlateNode[]
  createdAt: string
  createdBy: {
    id: string
    name: string
  }
  comments: Comment[]
}
