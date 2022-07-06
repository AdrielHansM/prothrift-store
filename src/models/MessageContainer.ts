import Message from "./Message";
import MessageThread from "./MessageThread";
import Product from "./Product";
import UserData from "./User";

interface MessageContainer {
  messageThread: MessageThread,
  messages: Message[],
  product: Product,
  receiver: UserData
}

export default MessageContainer