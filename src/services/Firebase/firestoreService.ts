import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  getDoc,
  query,
  where,
  getFirestore,
  onSnapshot
} from "firebase/firestore";
import { useState } from "react";
import { db } from "./firebaseApp";


export const createUser = async(userId: string, firstName: string, lastName: string, email: string, contact : number) => {
  await addDoc(collection(db, 'users'), { 
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      isDeleted: false,
      dateCreated: serverTimestamp(),
      dateUpdated: serverTimestamp(),
    }).catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const getUser = async(userId: string) => {
    const userRef = collection(db, 'users')
    const q = query(userRef, where('userId', '==', userId))
    const userDocs: any[] = [];

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        userDocs.push({...doc.data(), key: doc.id})
      })
    })


    return userDocs[0]
    

    
}
