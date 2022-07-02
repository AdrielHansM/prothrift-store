import Message from "./Message";
import MessageThread from "./MessageThread";
import UserData from "./User";

interface MessageContainer {
  messageThread: MessageThread,
  messages: Message[],
}

export default MessageContainer