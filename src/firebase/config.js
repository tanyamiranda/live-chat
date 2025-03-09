import {initializeApp} from 'firebase/app'
import {getFirestore,serverTimestamp } from 'firebase/firestore'
import {getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBb1H2s52dy1JCVindSwx9Z3OhHWuG_aIw",
  authDomain: "vueprojects-ae481.firebaseapp.com",
  projectId: "vueprojects-ae481",
  storageBucket: "vueprojects-ae481.firebasestorage.app",
  messagingSenderId: "827337055853",
  appId: "1:827337055853:web:e9227894c54632aeb42964"
};

//init firebase
const firebaseApp = initializeApp(firebaseConfig)

const projectAuth = getAuth(firebaseApp)
const projectFirestoreDB = getFirestore(firebaseApp)
const timestamp = serverTimestamp()

export {projectAuth, projectFirestoreDB, timestamp}