import { on } from 'events';
import Product from '../../models/Product';
import { database, storage } from "./firebaseApp";

export const createUser = async(userId: string, firstName: string, lastName: string, email: string, contact : number, dateUpdated : Date) => {
    await database.collection('users').add({ 
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contact: contact,
      isDeleted: false,
      dateCreated: dateUpdated ? dateUpdated : new Date(),
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

export const addUserFavorite = async (productId: string, userId: string) => {
  return await database
  .collection('favorites')
  .add({
    productId: productId,
    userId: userId,
    dateUpdated: new Date(),
    dateCreated: new Date()
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchUserFavorites = async (userId: string) => {
  let products: Product[] = []

  return await database
  .collection('favorites')
  .where('usedId', '==', userId)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach(async doc => {
      return await database
      .collection('products')
      .doc(doc.data().productId)
      .get()
      .then(documentSnapshot => {
        const productDetails = {
          productId: doc.id,
          userId: doc.data().userId,
          productName: doc.data().productName,
          productPrice: doc.data().productPrice,
          productWeight: doc.data().productWeight,
          productDescription: doc.data().productDescription,
          imageUrl: doc.data().imageUrl,
          meetup: doc.data().meetup,
          category: doc.data().category,
          status: doc.data().status,
          isDonated: doc.data().isDonated,
          isDeleted: doc.data().isDeleted,
          isSold: doc.data().isSold,
          dateCreated: doc.data().dateCreated,
          dateUpdated: doc.data().dateUpdated,
        };
        products.push(productDetails);
      })
    })
    return products;
  })
}

export const createProduct = async(userId: string, productName: string, productPrice: number, productWeight: number, productDescription : string, meetup: string, category: string, status: string, image: File) => {
  const imageUrl = await uploadImage(image, userId, productName)
  if(imageUrl) {
    return await database.collection('products').add({
        userId: userId,
        productName: productName,
        productPrice: productPrice,
        productWeight: productWeight,
        productDescription : productDescription,
        imageUrl: imageUrl,
        meetup: meetup,
        category: category,
        status: status,
        isDonated: false,
        isDeleted: false,
        isSold: false,
        dateCreated: new Date(),
        dateUpdated: new Date(),
    }).then(() => {
      return true;
    }).catch ((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " : " + errorMessage)
    })
  }
}

export const uploadImage = async (image: File, userId: string, productName: string) => {
  const uploadTask = storage.ref(`/images/${userId}/${image.name}_${productName}`).put(image)

  uploadTask.on('state_changed', () => {
  }, error => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  }
  );
  await uploadTask
  let downloadUrl = await storage.ref("images").child(`${userId}/${image.name}_${productName}`).getDownloadURL()
  return downloadUrl
}

export const updateProduct = async (image: any, userId: string, productId: string, productName: string, productDescription : string,meetup: string, category: string, productWeight: Number) => {
  let queryCreator:any = {};
  
  if (image) {
    const imageUrl = await uploadImage(image, userId, productName)
    if (imageUrl) {
      queryCreator.imageUrl = imageUrl
    }
  }

  if (productName) {
    queryCreator.productName = productName
  }

  if (productDescription) {
    queryCreator.productDescription = productDescription
  }

  if(productWeight) {
    queryCreator.productWeight = productWeight
  }

  if (meetup) {
    queryCreator.meetup = meetup
  }

  if (category) {
    queryCreator.category = category
  }

  if (queryCreator) {
    queryCreator.dateUpdated = new Date()
    return await database.collection('products')
    .doc(productId)
    .update(
      queryCreator
    )
  }
}

export const donateProduct = async (productId: string) => {
  return await database.collection('products').doc(productId)
    .update(
      {
        isDonated: false,
        dateUpdated: new Date()
      }
    )
}

export const searchProduct = async (searchKey : string) => {
  let products: Product[] = []

  return await database
  .collection('products')
  .where('productName', '==', searchKey)
  .where('isDeleted', '==', false)
  .where('isSold', '==', false)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      const productDetails = {
        productId: doc.id,
        userId: doc.data().userId,
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productWeight: doc.data().productWeight,
        productDescription: doc.data().productDescription,
        imageUrl: doc.data().imageUrl,
        meetup: doc.data().meetup,
        category: doc.data().category,
        status: doc.data().status,
        isDonated: doc.data().isDonated,
        isDeleted: doc.data().isDeleted,
        isSold: doc.data().isSold,
        dateCreated: doc.data().dateCreated,
        dateUpdated: doc.data().dateUpdated,
      }
      products.push(productDetails)
    })
    return products
  })
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
        productWeight: doc.data().productWeight,
        productDescription: doc.data().productDescription,
        imageUrl: doc.data().imageUrl,
        meetup: doc.data().meetup,
        category: doc.data().category,
        status: doc.data().status,
        isDonated: doc.data().isDonated,
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
      productWeight: productDoc.productWeight,
      productDescription: productDoc.productDescription,
      imageUrl: productDoc.imageUrl,
      meetup: productDoc.meetup,
      category: productDoc.category,
      status: productDoc.status,
      isDonated: productDoc.isDonated,
      isDeleted: productDoc.isDeleted,
      isSold: productDoc.isSold,
      dateCreated: productDoc.dateCreated,
      dateUpdated: productDoc.dateUpdated
    }
    return product
  })
}

export const fetchProductsByCategory = async(category: string) => {
  let categoryProducts: Product[] = []

  return await database
  .collection('products')
  .where('isDeleted', '==', false)
  .where('isSold', '==', false)
  .where('category', '==', category)
  .get()
  .then(querySnapshots => {
    querySnapshots.forEach(doc => {
      const productDetails = {
        productId: doc.id,
        userId: doc.data().userId,
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productWeight: doc.data().productWeight,
        productDescription: doc.data().productDescription,
        imageUrl: doc.data().imageUrl,
        meetup: doc.data().meetup,
        category: doc.data().category,
        status: doc.data().status,
        isDonated: doc.data().isDonated,
        isDeleted: doc.data().isDeleted,
        isSold: doc.data().isSold,
        dateCreated: doc.data().dateCreated,
        dateUpdated: doc.data().dateUpdated,
      }
      categoryProducts.push(productDetails)
    })
    return categoryProducts
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchProductsByProfile = async(userId: string) =>{
  let products: Product[] = []

  return await database
    .collection('products')
    .where('userId', '==', userId)
    .get()
    .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      const productDetails = {
        productId: doc.id,
        userId: doc.data().userId,
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productWeight: doc.data().productWeight,
        productDescription: doc.data().productDescription,
        imageUrl: doc.data().imageUrl,
        meetup: doc.data().meetup,
        category: doc.data().category,
        status: doc.data().status,
        isDonated: doc.data().isDonated,
        isDeleted: doc.data().isDeleted,
        isSold: doc.data().isSold,
        dateCreated: doc.data().dateCreated,
        dateUpdated: doc.data().dateUpdated,
      };
      products.push(productDetails);
    });
    return products;
  })
}

export const fetchTotalSaved = async() => {
  return await database
  .collection('products')
  .where('isDeleted', '==', false)
  .where('isSold', '==', false)
  .get()
  .then((docs) => {
    let totalSaved = 0;
    docs.forEach(productDoc => {
      totalSaved += productDoc.data().productWeight
    });
    return totalSaved
  })
}