import firebase from 'firebase/app'
import 'firebase/auth'

import { firebaseConfig } from 'config'

firebase.initializeApp(firebaseConfig)

export { firebase }
