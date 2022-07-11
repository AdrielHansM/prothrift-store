import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../../assets/styles/Chat.css";
import Message from "../../models/Message";
import MessageContainer from "../../models/MessageContainer";
import MessageThread from "../../models/MessageThread";
import Product from "../../models/Product";
import Transaction from "../../models/Transaction";
import UserData from "../../models/User";
import {
  fetchMessage,
  fetchBuyerThread,
  sendMessage,
  fetchSellerThread,
} from "../../services/Firebase/communicationService";
import {
  fetchSingleProduct,
  fetchUser,
} from "../../services/Firebase/productService";
import { fetchTransaction } from "../../services/Firebase/transactionService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/NavBar";

export default function Chats() {
  const userDetails = useLocation().state as UserData;

  const [conversationsBuyer, setConversationsBuyer] = useState<
    MessageContainer[]
  >([]);
  const [conversationsSeller, setConversationsSeller] = useState<
    MessageContainer[]
  >([]);

  const [buyerThreads, setBuyerThreads] = useState<MessageThread[]>([]);
  const [sellerThreads, setSellerThreads] = useState<MessageThread[]>([]);

  const [messageThreadFetched, setMessageThreadFetched] = useState(false);
  const [buyerThreadBuilt, setBuyerThreadBuilt] = useState(false);

  const [loading, setLoading] = useState(false);

  const [currentThread, setCurrentThread] = useState<MessageThread>();
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [currentChathead, setCurrentChathead] = useState<UserData>();
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>();

  const [messageToSend, setMessageToSend] = useState<string>();

  useEffect(() => {
    if (!messageThreadFetched) {
      getMessageThreads();
    }
  }, []);

  useEffect(() => {
    if (messageThreadFetched && buyerThreads.length > 0) {
      buildThreadBuyer();
    }
  }, [buyerThreads]);

  useEffect(() => {
    if (messageThreadFetched && sellerThreads.length > 0) {
      buildThreadSeller();
    }
  }, [sellerThreads]);

  const getMessageThreads = async () => {
    setLoading(true);
    const messageThreadsBuyer = await fetchBuyerThread(userDetails.userId);
    const messageThreadsSeller = await fetchSellerThread(userDetails.userId);

    if (messageThreadsBuyer && messageThreadsSeller) {
      setBuyerThreads(messageThreadsBuyer);
      setSellerThreads(messageThreadsSeller);
      setMessageThreadFetched(true);
    }
  };

  const buildThreadBuyer = async () => {
    let conversationArray: MessageContainer[] = [];
    buyerThreads.forEach(async (messageThread) => {
      const messages = await fetchMessage(messageThread.messageThreadId);
      const product = await fetchSingleProduct(messageThread.productId);
      const receiver = (await fetchUser(messageThread.receiverId)) as UserData;
      const transaction = await fetchTransaction(
        product.productId,
        messageThread.senderId,
        messageThread.receiverId
      );
      if (messages && product && transaction) {
        const conversationArrayIndex = {
          messageThread: messageThread,
          messages: messages,
          product: product,
          receiver: receiver,
          transaction: transaction,
        };
        conversationArray.push(conversationArrayIndex);
      }
    });
    setConversationsBuyer(conversationArray);
    const timeout = setTimeout(() => setLoading(false), 2500);
  };

  const buildThreadSeller = async () => {
    let conversationArray: MessageContainer[] = [];
    sellerThreads.forEach(async (messageThread) => {
      const messages = await fetchMessage(messageThread.messageThreadId);
      const product = await fetchSingleProduct(messageThread.productId);
      const receiver = (await fetchUser(messageThread.senderId)) as UserData;
      const transaction = await fetchTransaction(
        product.productId,
        messageThread.senderId,
        messageThread.receiverId
      );
      if (messages && product && transaction) {
        const conversationArrayIndex = {
          messageThread: messageThread,
          messages: messages,
          product: product,
          receiver: receiver,
          transaction: transaction,
        };
        conversationArray.push(conversationArrayIndex);
      }
    });
    setConversationsSeller(conversationArray);
    const timeout = setTimeout(() => setLoading(false), 2500);
  };

  const sendMessageProcess = async (threadId: string) => {
    if (messageToSend) {
      sendMessage(threadId, userDetails.userId, messageToSend);

      const newMessage = {
        messageId: "",
        fromId: userDetails.userId,
        messageContent: messageToSend,
        dateCreated: new Date(),
      };
      const messages: Message[] = currentMessages;
      messages.push(newMessage);
      setCurrentMessages(messages);
      setMessageToSend("");
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Navigation />
          <Loading />
        </>
      ) : (
        <>
          <Navigation />
          <div className="container">
            <div className="content-wrapper">
              <div className="row gutters">
                <div className="card">
                  {/* <!-- Row start --> */}
                  <div className="row no-gutters">
                    <div className="col-xl-3 col-lg-4 col-md-4 col-sm-3 col-3">
                      <div className="users-container">
                        <div className="chat-search-box">
                          <div className="input-group">
                            <input
                              className="form-control"
                              placeholder="Search"
                            />
                            <div className="input-group-btn">
                              <button type="button" className="btn btn-info">
                                <i className="fa fa-search"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <ul className="users">
                          <h5>For Sellers</h5>
                          <hr />
                          {conversationsBuyer.map((conversation, index) => {
                            return (
                              <>
                                <li
                                  key={index}
                                  className="person active-user"
                                  onClick={() => {
                                    setCurrentThread(
                                      conversation.messageThread
                                    );
                                    setCurrentMessages(conversation.messages);
                                    setCurrentProduct(conversation.product);
                                    setCurrentChathead(conversation.receiver);
                                    setCurrentTransaction(
                                      conversation.transaction
                                    );
                                  }}
                                >
                                  <div className="user">
                                    <img
                                      src={require("../../assets/images/user.png")}
                                    />
                                  </div>
                                  <p className="name-time">
                                    <span className="name">{`(Seller) ${conversation.receiver.firstName} ${conversation.receiver.lastName}`}</span>
                                  </p>
                                </li>
                              </>
                            );
                          })}
                          <h5>For Buyers</h5>
                          <hr />
                          {conversationsSeller.map((conversation, index) => {
                            return (
                              <>
                                <li
                                  key={index}
                                  className="person active-user"
                                  onClick={() => {
                                    setCurrentThread(
                                      conversation.messageThread
                                    );
                                    setCurrentMessages(conversation.messages);
                                    setCurrentProduct(conversation.product);
                                    setCurrentChathead(conversation.receiver);
                                    setCurrentTransaction(
                                      conversation.transaction
                                    );
                                  }}
                                >
                                  <div className="user">
                                    <img
                                      src={require("../../assets/images/user.png")}
                                    />
                                  </div>
                                  <p className="name-time">
                                    <span className="name">{`(Buyer) ${conversation.receiver.firstName} ${conversation.receiver.lastName}`}</span>
                                  </p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-9 col-9">
                      {currentMessages.length > 0 &&
                      currentThread &&
                      currentTransaction &&
                      currentChathead &&
                      currentProduct ? (
                        <>
                          <div className="selected-user">
                            <span>
                              To:{" "}
                              <span className="name">{`${currentChathead.firstName} ${currentChathead.lastName}`}</span>
                            </span>
                          </div>
                          <hr />

                          <div className="product-display">
                            <img
                              src={currentProduct.imageUrl}
                              alt=""
                              style={{
                                width: "100px",
                              }}
                            />
                            <div className="product-disp-title">
                              <h2>{currentProduct.productName}</h2>
                              <h3>₱{currentProduct.productPrice}</h3>
                            </div>
                            {currentTransaction.buyerId ===
                            userDetails.userId ? (
                              currentTransaction.transactionStatus ===
                              "SUCCESS" ? (
                                <div>
                                  <Button className="btn-trans">
                                    Leave a review
                                  </Button>
                                </div>
                              ) : (
                                <div>
                                  <Button className="btn-secondary" disabled>
                                    Leave a review
                                  </Button>
                                </div>
                              )
                            ) : (
                              <div>
                                <Button className="m-lg-4 btn-review">
                                  Complete Transaction
                                </Button>
                              </div>
                            )}
                          </div>
                          <hr />

                          <div className="chat-container">
                            <ul className="chat-box chatContainerScroll">
                              {currentMessages.map((message, index) => {
                                return (
                                  <>
                                    {currentChathead.userId ===
                                    message.fromId ? (
                                      <>
                                        <li key={index} className="chat-left">
                                          <div className="chat-avatar">
                                            <img
                                              src={require("../../assets/images/user.png")}
                                            />
                                            <div className="chat-name">
                                              {currentChathead.firstName}
                                            </div>
                                          </div>
                                          <div className="chat-text">
                                            {message.messageContent}
                                          </div>
                                        </li>
                                      </>
                                    ) : (
                                      <>
                                        <li className="chat-right">
                                          <div className="chat-text">
                                            {message.messageContent}
                                          </div>
                                          <div className="chat-avatar">
                                            <img
                                              src={require("../../assets/images/user.png")}
                                            />
                                            <div className="chat-name">
                                              {userDetails.userId ===
                                              message.fromId
                                                ? userDetails.firstName
                                                : currentChathead.firstName}
                                            </div>
                                          </div>
                                        </li>
                                      </>
                                    )}
                                  </>
                                );
                              })}
                            </ul>
                            <div
                              className="form-group"
                              style={{ display: "flex" }}
                            >
                              <textarea
                                className="chatbox"
                                rows={3}
                                placeholder="Type your message here..."
                                value={messageToSend}
                                onChange={(e) => {
                                  setMessageToSend(e.target.value);
                                }}
                              ></textarea>
                              <Button
                                className="mx-auto p-lg-1 send-btn"
                                onClick={() =>
                                  sendMessageProcess(
                                    currentThread.messageThreadId
                                  )
                                }
                              >
                                Send Message
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3 className="msg-noconvo">No Conversations yet</h3>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* <!-- Row end --> */}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
