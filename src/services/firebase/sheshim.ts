import { Question } from 'models'
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
      answersCount: 0,
      views: 0,
      answers: [],
      comments: [],
    }
    return sheshimCollection.addDoc(newQuestion)
  }
  return Promise.reject(new Error('You are not signed in.'))
}
