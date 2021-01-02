import { Node as SlateNode } from 'slate'

import {
  Sheshim,
  Comment,
  createInitialSheshim,
  parseSheshim,
  creatInitialComment,
  createInitialAnswer,
  Answer,
  SheshimAnswer,
} from 'models'
import { FormValues as SheshimValues } from 'screens/sheshim/sheshim-create/components/sheshim-form'
import { FormValues as SheshimCommentValues } from 'screens/sheshim/sheshim-details/components/sheshim-comment-form'

import { firebase } from './firebase'
import { CollectionManager } from './collection-manager'

export const sheshimCollection = new CollectionManager('sheshims')

export const createSheshim = (data: SheshimValues) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    const newQuestion: Sheshim = createInitialSheshim(data, currentUser)
    return sheshimCollection.addDoc(newQuestion)
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const fetchSheshims = async () => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return sheshimCollection
      .collectionRef()
      .orderBy('createdAt', 'desc')
      .get()
      .then((snapshot) => (snapshot.empty ? [] : snapshot.docs.map(parseSheshim)))
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const getSheshim = async (id: string) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return sheshimCollection.getDoc(id).then((doc) => (doc.exists ? parseSheshim(doc) : null))
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const fetchTopSheshims = async () => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return sheshimCollection
      .collectionRef()
      .orderBy('votes', 'desc')
      .limit(50)
      .get()
      .then((snapshot) => (snapshot.empty ? [] : snapshot.docs.map(parseSheshim)))
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const createSheshimComment = async (sheshimId: string, data: SheshimCommentValues) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    const newComment: Comment = creatInitialComment(data, currentUser)
    return sheshimCollection.addArrayItem(sheshimId, 'comments', newComment).then(() => newComment)
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const createSheshimAnswer = async (sheshimId: string, data: SlateNode[]) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    const newAnswer: Answer = createInitialAnswer(data, currentUser)
    return sheshimCollection
      .addArrayItem(sheshimId, 'answers', newAnswer)
      .then(() => ({ ...newAnswer, body: JSON.parse(newAnswer.body) }))
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const updateSheshimVote = (sheshimId: string, votes: number) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return sheshimCollection.docRef(sheshimId).update('votes', votes)
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const updateSheshimAnswerVote = async (
  sheshimId: string,
  sheshimAnswers: SheshimAnswer[],
  answerIdx: number,
  votes: number,
) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    const answers: Answer[] = sheshimAnswers.map((sheshimAnswer: SheshimAnswer, idx: number) =>
      idx === answerIdx
        ? { ...sheshimAnswer, votes, body: JSON.stringify(sheshimAnswer.body) }
        : {
            ...sheshimAnswer,
            body: JSON.stringify(sheshimAnswer.body),
          },
    )
    const updatedSheshimAnswers: SheshimAnswer[] = sheshimAnswers.map(
      (sheshimAnswer: SheshimAnswer, idx: number) =>
        idx === answerIdx ? { ...sheshimAnswer, votes } : sheshimAnswer,
    )
    return sheshimCollection
      .docRef(sheshimId)
      .update('answers', answers)
      .then(() => updatedSheshimAnswers)
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const updateSheshimAnswerComments = async (
  sheshimId: string,
  sheshimAnswers: SheshimAnswer[],
  answerIdx: number,
  data: SheshimCommentValues,
) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    const newComment: Comment = creatInitialComment(data, currentUser)
    const answers: Answer[] = sheshimAnswers.map((sheshimAnswer: SheshimAnswer, idx: number) =>
      idx === answerIdx
        ? {
            ...sheshimAnswer,
            body: JSON.stringify(sheshimAnswer.body),
            comments: sheshimAnswer.comments.concat(newComment),
          }
        : { ...sheshimAnswer, body: JSON.stringify(sheshimAnswer.body) },
    )
    return sheshimCollection
      .docRef(sheshimId)
      .update('answers', answers)
      .then(() => newComment)
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const updateSheshimViews = async (sheshimId: string, views: number) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return sheshimCollection
      .getDoc(sheshimId)
      .then((doc) =>
        doc.exists
          ? sheshimCollection.updateDoc(sheshimId, { ...doc.data, views } as Sheshim)
          : null,
      )
  }
  return Promise.reject(new Error('You are not signed in.'))
}
