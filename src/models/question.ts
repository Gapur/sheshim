import { Node as SlateNode } from 'slate'

import { Answer } from './answer'
import { Comment } from './comment'

export interface Question {
  id?: string
  title: string
  tags: string[]
  votes: number
  answersCount: number
  views: number
  body: string
  createdAt?: string
  createdBy?: {
    id: string
    name: string
  }
  answers: Answer[]
  comments: Comment[]
}

export interface QuestionView extends Omit<Question, 'body'> {
  body: SlateNode[]
}
