interface MessageThread {
  messageThreadId: string,
  senderId: string,
  receiverId: string,
  productId: string,
  dateUpdated: Date,
  dateCreated: Date
}

export default MessageThread;