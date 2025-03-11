import {initializeApp} from 'firebase/app'
import {getFirestore,serverTimestamp } from 'firebase/firestore'
import {getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};

const an = process.env.VUE_APP_AN
const ac = process.env.VUE_APP_AC

//init firebase
const firebaseApp = initializeApp(firebaseConfig)

const projectAuth = getAuth(firebaseApp)
const projectFirestoreDB = getFirestore(firebaseApp)
const timestamp = serverTimestamp()

export {projectAuth, projectFirestoreDB, timestamp, an, ac}