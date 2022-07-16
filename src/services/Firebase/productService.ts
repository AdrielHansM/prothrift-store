import Product from '../../models/Product';
import { database, storage } from "./firebaseApp";

export const createUser = async(userId: string, firstName: string, lastName: string, email: string, contact : number, dateUpdated : Date) => {
    await database.collection('users').add({ 
      userId: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      points: 0,
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

export const updateUser = async (userId: string, firstName: string, lastName: string, email: string, contact: number, dateUpdated: Date) => {
  let queryCreator:any = {}

  if (firstName) {
    queryCreator.firstName = firstName
  }

  if (lastName) {
    queryCreator.lastName = lastName
  }

  if (email) {
    queryCreator.email = email
  }

  if(contact) {
    queryCreator.contact = contact
  }

  queryCreator.dateUpdated = dateUpdated
  await database.collection('users')
  .where('userId' , '==', userId)
  .get()
  .then((querySnapshot) => {
    const userSnapshot = querySnapshot.docs[0]
    userSnapshot.ref.update(
      
        queryCreator
      
    )
  })
}

export const fetchUser = async (uid : string) => {
  return await database
  .collection('users')
  .where('userId', '==', uid)
  .get()
  .then((doc) => {
    const userDocs = doc.docs[0].data();
    const user = { userId: userDocs.userId, firstName: userDocs.firstName, lastName: userDocs.lastName, contactNumber: userDocs.contact, email: userDocs.email, points: Math.floor(userDocs.points), isLogged: true};
    return user;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const updateUserPoints = async (userId: string, newBalance: number) => {
  return await database
  .collection('users')
  .where('userId', '==', userId)
  .get()
  .then((querySnapshot) => {
    const userDoc = querySnapshot.docs[0]
    userDoc.ref.update({
      points: newBalance
    })
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

export const removeFromUserFavorites = async (productId: string, userId: string) => {
  return await database
  .collection('favorites')
  .where('productId', '==', productId)
  .where('userId', '==', userId)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      doc.ref.delete();
    });
  });
}

export const fetchUserFavorites = async (userId: string) => {
  let products: Product[] = []

  return await database
  .collection('favorites')
  .where('userId', '==', userId)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach(async doc => {
      await database
      .collection('products')
      .where('__name__', '==', doc.data().productId)
      .get()
      .then((documentSnapshot) => {        
        const productDoc = documentSnapshot.docs[0].data() 
        const productDetails = {
          productId: documentSnapshot.docs[0].id,
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
          dateUpdated: productDoc.dateUpdated,
        };
        products.push(productDetails);
      })
    })
    return products;
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const validateIfFavorite = async (userId: string, productId: string) => {
  return await database
  .collection('favorites')
  .where('userId', '==', userId)
  .where('productId', '==', productId)
  .get()
  .then((docs) => {
    if (docs.empty) {
      return false;
    }
    return true;
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
        searchKey: productName.trim().toLowerCase(),
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

export const updateProduct = async (image: any, userId: string, productId: string, productName: string, productPrice: number, productDescription : string, meetup: string, category: string, productWeight: number) => {
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

  if (productPrice) {
    queryCreator.productPrice = productPrice
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
    ).then(() =>{return true})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + " " + errorMessage)
    })
  }
}

export const deleteProduct = async ( productId: string) => {
  return await database.collection('products')
  .doc(productId)
  .update({
    isDeleted: true
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const donateProduct = async (productId: string) => {
  return await database.collection('products').doc(productId)
  .update(
    {
      isDonated: true,
      dateUpdated: new Date()
    }
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const markProductAsSold = async (productId: string) => {
  return await database.collection('products').doc(productId)
  .update(
    {
      isSold: true,
      dateUpdated: new Date()
    }
  ).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const searchProduct = async (searchKey : string, userId: string) => {
  let products: Product[] = []

  return await database
  .collection('products')
  .orderBy('searchKey')
  .startAt(searchKey.trim().toLowerCase()).endAt(searchKey.trim().toLowerCase() + '~')
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach(doc => {
      const productDetails = {
        productId: doc.id,
        userId: doc.data().userId,
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productWeight: Math.floor(doc.data().productWeight),
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

export const fetchProducts = async (userId: string) => {
  let products: Product[] = []

  return await database
  .collection('products')
  .where('isDeleted', '==', false)
  .where('isSold', '==', false)
  .where('userId', '!=', userId)
  .get()
  .then(querySnapshots => {
    querySnapshots.forEach(doc => {
      const productDetails = {
        productId: doc.id,
        userId: doc.data().userId,
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productWeight: Math.floor(doc.data().productWeight),
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
      productWeight: Math.floor(productDoc.productWeight),
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

export const fetchProductsByCategory = async(category: string, userId: string) => {
  let categoryProducts: Product[] = []

  return await database
  .collection('products')
  .where('category', '==', category)
  .where('isDeleted', '==', false)
  .where('isSold', '==', false)
  .where('userId', '!=', userId)
  .get()
  .then(querySnapshots => {
    querySnapshots.forEach(doc => {
      const productDetails = {
        productId: doc.id,
        userId: doc.data().userId,
        productName: doc.data().productName,
        productPrice: doc.data().productPrice,
        productWeight: Math.floor(doc.data().productWeight),
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
        productWeight: Math.floor(doc.data().productWeight),
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