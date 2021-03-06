import { Sheshim, Answer, Comment, User } from 'models'

import { firebase } from './firebase'

export const timestamp = firebase.firestore.FieldValue.serverTimestamp()
export const { now } = firebase.firestore.Timestamp

type DocType = Sheshim | User

type DocArrayType = Answer | Comment

interface SnapshotObserver {
  next?: (snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => void
  error?: (error: firebase.firestore.FirestoreError) => void
  complete?: () => void
}

export class CollectionManager {
  db: firebase.firestore.Firestore
  collectionName: string
  collection: firebase.firestore.CollectionReference

  constructor(collection: string) {
    this.db = firebase.firestore()
    this.collectionName = collection
    this.collection = firebase.firestore().collection(collection)
  }

  dbRef = () => this.db

  collectionRef = () => this.collection

  docRef = (id: string) => this.collection.doc(id)

  setDoc = (id: string, data: DocType) =>
    this.collection.doc(id).set({
      ...data,
      createdAt: timestamp,
      updatedAt: timestamp,
    })

  setMergeDoc = (id: string, data: DocType) =>
    this.collection.doc(id).set(
      {
        ...data,
        updatedAt: timestamp,
      },
      {
        merge: true,
      },
    )

  addDoc = (data: DocType) =>
    this.collection.add({
      ...data,
      createdAt: now(),
      updatedAt: now(),
    })

  updateDoc = (id: string, data: DocType) =>
    this.collection.doc(id).update({ ...data, updatedAt: timestamp })

  removeDoc = (id: string) => this.collection.doc(id).delete()

  getDoc = (id: string) => this.collection.doc(id).get()

  getAll = () => this.collection.get()

  getSome = (ids: string[]) => Promise.all(ids.map((id) => this.collection.doc(id).get()))

  onSnapshot = (observer: SnapshotObserver) => this.collection.onSnapshot(observer)

  search = (
    fieldPath: string | firebase.firestore.FieldPath,
    op: firebase.firestore.WhereFilterOp,
    value: unknown,
  ) => this.collection.where(fieldPath, op, value)

  where = (
    fieldPath: string | firebase.firestore.FieldPath,
    op: firebase.firestore.WhereFilterOp,
    value: unknown,
  ) => this.collection.where(fieldPath, op, value)

  addArrayItem = (id: string, field: string, item: DocArrayType) =>
    this.collection.doc(id).update({ [field]: firebase.firestore.FieldValue.arrayUnion(item) })

  removeArrayItem = (id: string, field: string, item: DocArrayType) =>
    this.collection.doc(id).update({ [field]: firebase.firestore.FieldValue.arrayRemove(item) })
}
