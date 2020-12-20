import { Node as SlateNode } from 'slate'

import { Answer } from './answer'
import { Comment } from './comment'

export interface Question {
  id: string
  votes: number
  answersCount: number
  views: number
  title: string
  body: SlateNode[]
  tags: string[]
  createdAt: string
  createdBy: {
    id: string
    name: string
  }
  answers: Answer[]
  comments: Comment[]
}
