import MaterialsRecycled from '../../models/MaterialsRecycled';
import MaterialsRecycledByUser from '../../models/MaterialsRecycledByUser';
import Review from '../../models/Review';
import Transaction from '../../models/Transaction';
import { database } from "./firebaseApp";

export const createTransaction = async (productId: string, buyerId: string, sellerId : string, transactionStatus: string) => {
  return await database
  .collection('transactions')
  .add({
    productId : productId,
    buyerId : buyerId,
    sellerId : sellerId,
    transactionStatus: transactionStatus,
    dateUpdated: new Date(),
    dateCreated: new Date()
  }).then(()=> {
    return true
  })
  .catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " : " + errorMessage)
  })
}

export const fetchTransaction =async (productId: string, buyerId: string, sellerId: string) => {
  return await database
  .collection('transactions')
  .where('productId', '==', productId)
  .where('buyerId', '==', buyerId)
  .where('sellerId', '==', sellerId)
  .get()
  .then((transactionSnapshots) => {
    const transactionDoc = transactionSnapshots.docs[0].data()
    const transactionData = {
      transactionId: transactionDoc.id,
      productId: transactionDoc.productId,
      buyerId: transactionDoc.buyerId,
      sellerId: transactionDoc.sellerId,
      transactionStatus: transactionDoc.transactionStatus,
      dateUpdated: transactionDoc.dateUpdated,
      dateCreated: transactionDoc.dateCreated
    }

    return transactionData as Transaction
  })
}
export const updateTransaction = async (productId: string, status: string) => {
  return await database
  .collection('transactions')
  .doc(productId)
  .update(
    {
      transactionStatus: status,
      dateUpdated: new Date()
    }
  ).then(() => {
    return true;
  }).catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " : " + errorMessage)
  })
}

export const createUserReview = async(productId: string, sellerId: string, userId: string, rating: Number, review: string) => {
  return await database
  .collection('reviews')
  .add({
    productId: productId,
    sellerId: sellerId, 
    userId: userId,
    rating: rating,
    review: review,
    dateUpdated: new Date(),
    dateCreated: new Date()
  }).catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " : " + errorMessage)
  })
}

export const fetchUserReviews = async(sellerId: string) => {
  let reviews: Review[] = []

  return await database
  .collection('reviews')
  .where('sellerId', '==', sellerId)
  .get()
  .then(querySnapshots => {
    querySnapshots.forEach(doc => {
      const review = {
        reviewId: doc.id,
        productId: doc.data().productId,
        sellerId: doc.data().sellerId,
        userId: doc.data().userId,
        rating: doc.data().rating,
        review: doc.data().review,
        dateUpdated: doc.data().dateUpdated,
        dateCreated: doc.data().dateCreated
      }
      reviews.push(review)
    })
    return reviews
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const createMaterialsRecycled = async (productId: string, productName: string, userId: string, weightRecycled: Number) => {
  await database
  .collection('materialsRecycled')
  .add({
    productId: productId,
    productName: productName,
    userId: userId,
    weightRecycled: weightRecycled,
    dateUpdated: new Date(),
    dateCreated: new Date()
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchMaterialsRecycled = async (userId:string) => {
  let totalMaterialsRecycled = 0;
  let materialsRecycled: MaterialsRecycled[] = []
  let materialsRecycledByUser: MaterialsRecycledByUser

  return await database
  .collection('materialsRecycled')
  .where('userId', '==', userId)
  .get()
  .then(querySnapshots => {
    querySnapshots.forEach(doc => {
      totalMaterialsRecycled += doc.data().weightRecycled
      const materialRecycled = {
        materialId: doc.id,
        productId: doc.data().productId,
        productName: doc.data().productName,
        userId: doc.data().userId,
        weightRecycled: doc.data().weightRecycled,
        dateUpdated: doc.data().dateUpdated,
        dateCreated: doc.data().dateCreated
      }
      materialsRecycled.push(materialRecycled)
    })
    materialsRecycledByUser.totalMaterialsReycled = totalMaterialsRecycled
    materialsRecycledByUser.materialsRecycled = materialsRecycled
    return materialsRecycledByUser
  })
}