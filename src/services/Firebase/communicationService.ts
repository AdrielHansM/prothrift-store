import Message from "../../models/Message";
import MessageThread from "../../models/MessageThread";
import { database } from "./firebaseApp";

export const createNewMessageThread = async(senderId: string, receiverId: string, productId: string, messageOffer: string)=> {
  await database
    .collection('messageThread')
    .add({
      senderId: senderId,
      receiverId: receiverId,
      productId: productId,
      dateCreated: new Date(),
      dateUpdated: new Date()
    })
    .then( async (messageThreadRef)=> {
    await database
      .collection('messageThread').doc(messageThreadRef.id)
      .collection('messages')
      .add({
      fromId: senderId,
      messageContent: messageOffer,
    })
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchMessageThread = async(userId: string) => {
  let messageThreads: MessageThread[] = [];

  return await database
  .collection('messageThread')
  .where(userId, 'in', ['senderId', 'receiverId'])
  .get()
  .then((querySnapshot)=>{
    querySnapshot.forEach(doc => {
      const messageThread = {
        messageThreadId: doc.id,
        senderId: doc.data().senderId,
        receiverId: doc.data().receiverId,
        productId: doc.data().productId,
        dateCreated: doc.data().dateCreated,
        dateUpdated: doc.data().dateUpdated,
      }
      messageThreads.push(messageThread)
    })
    return messageThreads
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const sendMessage = async(messageThreadId: string, senderId: string, messageContent: string) => {
  await database
  .collection('messageThread')
  .doc(messageThreadId)
  .collection('messages')
  .add({
    fromId: senderId,
    messageContent: messageContent,
    dateCreated: new Date()
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode + " " + errorMessage)
  })
}

export const fetchMessage = async(messageThreadId: string) => {
  let messages: Message[] = [];

  return await database
    .collection('messageThread')
    .doc(messageThreadId)
    .collection('messages')
    .onSnapshot((messageDocs) => {
      messageDocs.forEach(doc => {
        const message = {
          messageId: doc.id,
          fromId: doc.data().id,
          messageContent: doc.data().messageContent,
          dateCreated: doc.data().dateCreated
        }
        messages.push(message)
      })
      return messages
    })
}
