import { initializeApp } from 'firebase/app'
// Manage Data
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    doc,
    orderBy,
    limit,
    onSnapshot,
    query,
} from 'firebase/firestore'

// Authentication
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

// Storage

import {
    getStorage,
    uploadBytes, 
    uploadString
} from 'firebase/storage'

const firebaseConfig = {
   //...
  };
  // App
  const app = initializeApp(firebaseConfig)
  // Database and Authentication
  const db = getFirestore()
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()

  // storage

  const storage = getStorage(app)

  // Export firebase functions

  export {
    app,
    db,
    collection,
    getDocs,
    addDoc,
    deleteDoc,
    serverTimestamp,
    doc,
    auth,
    orderBy,
    limit,
    onSnapshot,
    query,
    googleProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged, 
    storage,
    uploadBytes,
    uploadString,
    updateDoc
  }