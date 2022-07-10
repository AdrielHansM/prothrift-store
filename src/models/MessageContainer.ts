import Message from "./Message";
import MessageThread from "./MessageThread";
import Product from "./Product";
import Transaction from "./Transaction";
import UserData from "./User";

interface MessageContainer {
  messageThread: MessageThread,
  messages: Message[],
  product: Product,
  receiver: UserData,
  transaction: Transaction
}

export default MessageContainer