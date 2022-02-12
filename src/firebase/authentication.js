import { initializeApp } from "firebase/app"
import { getAuth, signInAnonymously } from "firebase/auth"
import { enableIndexedDbPersistence, getFirestore } from "firebase/firestore"

import { firebaseConfig } from '../config/firebaseToken'

// Initialize Firebase
initializeApp(firebaseConfig)

export const auth = getAuth()
export const db = getFirestore()
enableIndexedDbPersistence(db)

signInAnonymously(auth)
	.catch((error) => {
		const errorCode = error.code
		const errorMessage = error.message
		console.log(errorCode, errorMessage)
	})
