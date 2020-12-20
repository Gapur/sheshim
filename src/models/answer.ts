import { Node as SlateNode } from 'slate'

import { Comment } from './comment'

export interface Answer {
  id: number
  votes: number
  body: SlateNode[]
  createdAt: string
  createdBy: string
  comments: Comment[]
}
