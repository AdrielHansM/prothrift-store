import firebase from 'firebase/app';
import Firebase, { auth, database, storage } from "./firebaseApp";
import UserData from "../../models/User";
import Product from '../../models/Product';

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
  return await database
    .collection('users')
    .where('userId', '==', uid)
    .get()
    .then((doc) => {
      const userDocs = doc.docs[0].data();

      const user = { userId: userDocs.userId, firstName: userDocs.firstName, lastName: userDocs.lastName, contactNumber: userDocs.contact, email: userDocs.email, isLogged: true};

      return user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const createProduct = async(userId: string, productName: string, productPrice: number, productDescription : string, meetup: string, category: string, status: string, image: File) => {
  const imageUrl = await uploadImage(image)
  if(imageUrl) {
    return await database.collection('products').add({
        userId: userId,
        productName: productName,
        productPrice: productPrice,
        productDescription : productDescription,
        imageUrl: imageUrl,
        meetup: meetup,
        category: category,
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
}

export const uploadImage = async (image: File) => {
  const uploadTask = storage.ref(`/images/${image.name}`).put(image)

  uploadTask.on('state_changed', () => {
  }, error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  }
  );
  await uploadTask
  let downloadUrl = await storage.ref("images").child(image.name).getDownloadURL()
  return downloadUrl
}

export const fetchProducts = async () => {
  let products: Product[] = []

  return await database
  .collection('products')
  .where('isDeleted', '==', false)
  .where('isSold', '==', false)
  .get()
  .then(querySnapshots => {
    querySnapshots.forEach(doc => {
      const productDetails = {
        productId: doc.id,
        userId: doc.data().userId,
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productDescription: doc.data().productDescription,
        imageUrl: doc.data().imageUrl,
        meetup: doc.data().meetup,
        category: doc.data().category,
        status: doc.data().status,
        isDeleted: doc.data().isDeleted,
        isSold: doc.data().isSold,
        dateCreated: doc.data().dateCreated,
        dateUpdated: doc.data().dateUpdated,
      }
      products.push(productDetails)
    })
    return products
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchSingleProduct = async (productId: string) => {
  return await database
    .collection('products')
    .where('__name__', '==', productId)
    .get()
    .then((doc) => {
      const productDoc = doc.docs[0].data()

      const product = {
        productId: doc.docs[0].id, 
        userId: productDoc.userId,
        productName: productDoc.productName,
        productPrice: productDoc.productPrice,
        productDescription: productDoc.productDescription,
        imageUrl: productDoc.imageUrl,
        meetup: productDoc.meetup,
        category: productDoc.category,
        status: productDoc.status,
        isDeleted: productDoc.isDeleted,
        isSold: productDoc.isSold,
        dateCreated: productDoc.dateCreated,
        dateUpdated: productDoc.dateUpdated
      }

      return product
    })
}