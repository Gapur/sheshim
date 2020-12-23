import { Question, QuestionView } from 'models'
import { FormValues } from 'screens/sheshim/sheshim-create/components/sheshim-form'

import { firebase } from './firebase'
import { CollectionManager } from './collection-manager'

export const sheshimCollection = new CollectionManager('sheshims')

export const createSheshim = (data: FormValues) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    const newQuestion: Question = {
      title: data.title,
      tags: data.tags,
      body: JSON.stringify(data.body),
      votes: 0,
      views: 0,
      answers: [],
      comments: [],
      createdBy: {
        id: currentUser.uid,
        name: currentUser.displayName ?? currentUser.email ?? 'Anonymous',
      },
    }
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
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          return []
        }
        return querySnapshot.docs.map((doc) => {
          const question = doc.data() as Question
          return {
            ...question,
            id: doc.id,
            body: JSON.parse(question.body),
          } as QuestionView
        })
      })
  }
  return Promise.reject(new Error('You are not signed in.'))
}

export const getSheshim = async (id: string) => {
  const { currentUser } = firebase.auth()
  if (currentUser) {
    return sheshimCollection.getDoc(id).then((doc) => {
      if (doc.exists) {
        const question = doc.data() as Question
        return {
          ...question,
          id: doc.id,
          body: JSON.parse(question.body),
        } as QuestionView
      }
      return null
    })
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
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          return []
        }
        return querySnapshot.docs.map((doc) => {
          const question = doc.data() as Question
          return {
            ...question,
            id: doc.id,
            body: JSON.parse(question.body),
          } as QuestionView
        })
      })
  }
  return Promise.reject(new Error('You are not signed in.'))
}
