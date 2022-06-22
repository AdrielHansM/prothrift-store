import firebase from 'firebase/app';
import Firebase, { auth, database, storage } from "./firebaseApp";
import UserData from "../../models/User";
import Product from '../../models/Product';

export const createTransaction = async (productId: string, buyerId: string, sellerId : string, transactionStatus: string) => {
  return await database.collection('transactions').add({
    productId : productId,
    buyerId : buyerId,
    sellerId : sellerId,
    transactionStatus: transactionStatus,
    dateUpdated: new Date(),
    dateCreated: new Date()
  }).catch ((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " : " + errorMessage)
  })
}

export const updateTransaction = async (productId: string) => {
  return await database.collection('transactions')
    .doc(productId)
    .update(
      {
        transactionStatus: 'SUCCESS',
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
  return await database.collection('reviews')
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