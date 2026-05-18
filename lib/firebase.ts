import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB1ZTOLsUa41WdjZsdOa4pC5NtBeNxqRLM",
  authDomain: "hamza-web-6b26f.firebaseapp.com",
  projectId: "hamza-web-6b26f",
  storageBucket: "hamza-web-6b26f.firebasestorage.app",
  messagingSenderId: "953119894128",
  appId: "1:953119894128:web:40497ad6d296be2d62a2b5",
  measurementId: "G-PEFTEN4187",
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
