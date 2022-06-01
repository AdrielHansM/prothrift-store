import {getFirestore, collection, addDoc, query, orderBy, limit, onSnapshot, setDoc, updateDoc, doc, serverTimestamp, where, } from 'firebase/firestore';

import {getStorage, ref, uploadBytesResumable, getDownloadURL,} from 'firebase/storage';

export const createUser = async(userId: string, firstName: string, lastName: string, email: string, contact : number) => {
  await addDoc(collection(getFirestore(), 'users'), { 
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
  const user = await query(collection(getFirestore(), 'users'), where('userId', '==' ,userId));
}
