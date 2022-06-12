import firebase from 'firebase/app';
import Firebase, { auth, database, storage } from "./firebaseApp";
import UserData from "../../models/User";

export const createUser = async(userId: string, firstName: string, lastName: string, email: string, contact : number) => {
    await database.collection('users').add({ 
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      isDeleted: false,
      dateCreated: new Date(),
      dateUpdated: new Date(),
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
      const user = { userId: userDocs.userId, firstName: userDocs.firstName, lastName: userDocs.lastName, contactNumber: userDocs.contact, email: userDocs.email, isLogged: true};

      return user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const createProduct = async(productName: string, productPrice: number, productDescription : string, status: string, meetup: string,   image: File) => {
  const imageUrl = await uploadImage(image)
  await database.collection('products').add({
      productName: productName,
      productPrice: productPrice,
      productDescription : productDescription,
      imageUrl: imageUrl,
      meetup: meetup,
      status: status,
      isDeleted: false,
      isSold: false,
      dateCreated: new Date(),
      dateUpdated: new Date(),
  }).then(() => {
    return true;
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

  await uploadTask.on('state_changed', () => {
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
