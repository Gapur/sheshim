import { firebase } from './firebase'

export const timestamp = firebase.firestore.FieldValue.serverTimestamp()
export const { now } = firebase.firestore.Timestamp

interface SnapshotObserver {
  next?: (snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => void
  error?: (error: firebase.firestore.FirestoreError) => void
  complete?: () => void
}

class CollectionManager {
  db: firebase.firestore.Firestore
  collectionName: string
  collection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>

  constructor(collection: string) {
    this.db = firebase.firestore()
    this.collectionName = collection
    this.collection = firebase.firestore().collection(collection)
  }

  dbRef = () => this.db

  collectionRef = () => this.collection

  docRef = (id: string) => this.collection.doc(id)

  setDoc = (id: string, data: firebase.firestore.DocumentData) =>
    this.collection.doc(id).set({
      ...data,
      created_at: timestamp,
      updated_at: timestamp,
    })

  setMergeDoc = (id: string, data: firebase.firestore.DocumentData) =>
    this.collection.doc(id).set(
      {
        ...data,
        updated_at: timestamp,
      },
      {
        merge: true,
      },
    )

  addDoc = (data: firebase.firestore.DocumentData) =>
    this.collection.add({
      ...data,
      created_at: now(),
      updated_at: now(),
    })

  updateDoc = (id: string, data: firebase.firestore.DocumentData) =>
    this.collection.doc(id).update({ ...data, updated_at: timestamp })

  removeDoc = (id: string) => this.collection.doc(id).delete()

  getDoc = (id: string) => this.collection.doc(id).get()

  getAll = () => this.collection.get()

  getSome = (ids: string[]) => {
    return Promise.all(
      ids.map((id) => {
        return this.collection.doc(id).get()
      }),
    )
  }

  onSnapshot = (observer: SnapshotObserver) => this.collection.onSnapshot(observer)

  search = (
    fieldPath: string | firebase.firestore.FieldPath,
    op: firebase.firestore.WhereFilterOp,
    value: string,
  ) => this.collection.where(fieldPath, op, value)

  where = (
    fieldPath: string | firebase.firestore.FieldPath,
    op: firebase.firestore.WhereFilterOp,
    value: string,
  ) => this.collection.where(fieldPath, op, value)

  deleteField = (id: string, field: string) =>
    this.collection.doc(id).update({ [field]: firebase.firestore.FieldValue.delete() })

  addArrayItem = (id: string, field: string, item: unknown) => {
    const ref = this.collection.doc(id)
    return firebase.firestore().runTransaction((transaction) => {
      return transaction.get(ref).then((snapshot) => {
        const updatedList = snapshot.get(field) || []
        updatedList.push(item)
        return transaction.update(ref, field, updatedList).update(ref, 'updated_at', timestamp)
      })
    })
  }

  removeArrayItem = (id: string, field: string, item: unknown) => {
    const ref = this.collection.doc(id)
    return firebase.firestore().runTransaction((transaction) => {
      return transaction.get(ref).then((snapshot) => {
        const updatedList = (snapshot.get(field) || []).filter(
          (arrayItem: unknown) => JSON.stringify(arrayItem) !== JSON.stringify(item),
        )
        transaction.update(ref, field, updatedList).update(ref, 'updated_at', timestamp)
      })
    })
  }
}

export default CollectionManager
