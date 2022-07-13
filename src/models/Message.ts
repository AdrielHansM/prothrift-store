interface Message {
  messageId: string,
  fromId: string,
  messageContent: string,
  dateCreated: Date
}

export default Message;