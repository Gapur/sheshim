import { Sheshim, Comment, createInitialSheshim, parseSheshim, creatInitialComment } from 'models'
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

export const createSheshimComment = (sheshimId: string, data: SheshimCommentValues) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    const newComment: Comment = creatInitialComment(data, currentUser)
    return sheshimCollection.addArrayItem(sheshimId, 'comments', newComment).then(() => newComment)
  }
  return Promise.reject(new Error('You are not signed in.'))
}
