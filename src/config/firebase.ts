import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCNXzCP_CMPx_34a6Z2Z6gGZYqVVvcmR_w',
  authDomain: 'crud-firebase-app-43d88.firebaseapp.com',
  projectId: 'crud-firebase-app-43d88',
  storageBucket: 'crud-firebase-app-43d88.appspot.com',
  messagingSenderId: '555287743553',
  appId: '1:555287743553:web:9c01f248933567e7aa8ac0',
  measurementId: 'G-XRN0WDCV86',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
