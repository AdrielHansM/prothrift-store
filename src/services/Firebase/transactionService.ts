import MaterialsRecycled from '../../models/MaterialsRecycled';
import MaterialsRecycledByUser from '../../models/MaterialsRecycledByUser';
import Review from '../../models/Review';
import Transaction from '../../models/Transaction';
import Voucher from '../../models/Voucher';
import { database } from "./firebaseApp";

export const createTransaction = async (productId: string, buyerId: string, sellerId : string, transactionStatus: string) => {
  return await database
  .collection('transactions')
  .add({
    productId : productId,
    buyerId : buyerId,
    sellerId : sellerId,
    transactionStatus: transactionStatus,
    voucherApplied: false,
    isReviewed: false,
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

export const fetchTransaction = async (productId: string, buyerId: string, sellerId: string) => {
  return await database
  .collection('transactions')
  .where('productId', '==', productId)
  .where('buyerId', '==', buyerId)
  .where('sellerId', '==', sellerId)
  .get()
  .then((transactionSnapshots) => {
    const transactionDoc = transactionSnapshots.docs[0].data()
    const transactionData = {
      transactionId: transactionSnapshots.docs[0].id,
      productId: transactionDoc.productId,
      buyerId: transactionDoc.buyerId,
      sellerId: transactionDoc.sellerId,
      transactionStatus: transactionDoc.transactionStatus,
      voucherApplied: transactionDoc.voucherApplied,
      isReviewed: transactionDoc.isReviewed,
      voucherId: transactionDoc.voucherId,
      dateUpdated: transactionDoc.dateUpdated,
      dateCreated: transactionDoc.dateCreated
    }

    return transactionData as Transaction
  })
}

export const fetchTransactionsSeller =async (sellerId: string) => {
  let transactions:Transaction[] = []

  return await database
  .collection('transactions')
  .where('sellerId', '==', sellerId)
  .get()
  .then((transactionSnapshots) => {
    transactionSnapshots.forEach(transactionSnapshot => {
      const transaction = {
        transactionId: transactionSnapshot.id,
        productId: transactionSnapshot.data().productId,
        buyerId: transactionSnapshot.data().buyerId,
        sellerId: transactionSnapshot.data().sellerId,
        transactionStatus: transactionSnapshot.data().transactionStatus,
        voucherApplied: transactionSnapshot.data().voucherId,
        isReviewed: transactionSnapshot.data().isReviewed,
        dateUpdated: transactionSnapshot.data().dateUpdated,
        dateCreated: transactionSnapshot.data().dateCreated
      }
      transactions.push(transaction)
    })
    return transactions
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchTransactionsBuyer =async (buyerId: string) => {
  let transactions:Transaction[] = []

  return await database
  .collection('transactions')
  .where('buyerId', '==', buyerId)
  .get()
  .then((transactionSnapshots) => {
    transactionSnapshots.forEach(transactionSnapshot => {
      const transaction = {
        transactionId: transactionSnapshot.id,
        productId: transactionSnapshot.data().productId,
        buyerId: transactionSnapshot.data().buyerId,
        sellerId: transactionSnapshot.data().sellerId,
        transactionStatus: transactionSnapshot.data().transactionStatus,
        voucherApplied: transactionSnapshot.data().voucherId,
        isReviewed: transactionSnapshot.data().isReviewed,
        dateUpdated: transactionSnapshot.data().dateUpdated,
        dateCreated: transactionSnapshot.data().dateCreated
      }
      transactions.push(transaction)
    })
    return transactions
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const updateRelatedTransaction =async (productId: string, buyerId: string, status: string) => {
  return await database
  .collection('transactions')
  .where('productId', '==', productId)
  .where('buyerId', '!=', buyerId)
  .get()
  .then((querySnapshots)=> {
    querySnapshots.forEach((querySnapshot)=> {
      querySnapshot.ref.update({
        transactionStatus: status,
        dateUpdated: new Date()
      })
    })
  })
}

export const updateTransactionStatus = async (transactionId: string, status: string) => {
  return await database
  .collection('transactions')
  .doc(transactionId)
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

export const updateTransactionReview = async (transactionId : string) => {
  return await database
  .collection('transactions')
  .doc(transactionId)
  .update(
    {
      isReviewed: true,
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

export const applyVoucherToTransaction = async (voucherId: string, transactionId : string) => {
  return await database
  .collection('transactions')
  .doc(transactionId)
  .update(
    {
      voucherId: voucherId,
      voucherApplied: true,
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

export const createUserReview = async(productId: string, sellerId: string, userId: string, transactionId: string, rating: Number, review: string) => {
  return await database
  .collection('reviews')
  .add({
    productId: productId,
    sellerId: sellerId, 
    transactionId: transactionId,
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

export const createVoucher = async (voucherValue: number, userId: string) => {
  return await database
  .collection('vouchers')
  .add({
    voucherValue: voucherValue,
    userId: userId,
    isUsed: false,
    dateUpdated: new Date(),
    dateCreated: new Date()
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchVouchers = async (userId: string) => {
  let vouchers: Voucher[] = [];

  return await database
  .collection('vouchers')
  .where('userId', '==', userId)
  .get()
  .then((querySnapshots) => {
    querySnapshots.forEach((voucherSnapshot) => {
      const voucher = {
        voucherId: voucherSnapshot.id,
        voucherValue: voucherSnapshot.data().voucherValue,
        userId: voucherSnapshot.data().userId,
        isUsed: voucherSnapshot.data().isUsed,
        dateUpdated: voucherSnapshot.data().dateUpdated,
        dateCreated: voucherSnapshot.data().dateCreated
      }
      vouchers.push(voucher);
    })
    return vouchers
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const updateVoucher = async (voucherId: string) => {
  await database
  .collection('vouchers')
  .doc(voucherId)
  .update({
    isUsed: true,
    dateUpdated: new Date()
  })
  
}
