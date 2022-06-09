import firebase from 'firebase/app';
import Firebase, { auth, database, storage } from "./firebaseApp";
import { useState } from "react";
import UserData from "../../models/User";

export const createUser = async(userId: string, firstName: string, lastName: string, email: string, contact : number) => {
  await database.collection('users').add({ 
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      isDeleted: false,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp,
      dateUpdated: firebase.firestore.FieldValue.serverTimestamp,
    }).catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const getUser = async (uid : string) => {
  return await database.collection('users').where('userId', '==', uid).get().then((doc) => {
      const userDocs = doc.docs[0].data();

      //Map the data to the UserData interface
      const user = { userId: userDocs.userId, firstName: userDocs.firstName, lastName: userDocs.lastName, contactNumber: userDocs.contact, email: userDocs.email, };

      return user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const createProduct = async(pName: string, price: number) => {

  await database.collection('products').add({
      pName: pName,
      price: price,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp,
      dateUpdated: firebase.firestore.FieldValue.serverTimestamp,
  }).catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const uploadImage = async (image: File) => {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child(`images/${image.name}`);
  const uploadTask = imageRef.put(image);

  await uploadTask.on('state_changed', (snapshot) => {
    const progress = Math.round(
      (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    );
  }, error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  }, () => {
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        return url;
      });
    }
  )
}
