import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../../assets/styles/Chat.css";
import Message from "../../models/Message";
import MessageContainer from "../../models/MessageContainer";
import MessageThread from "../../models/MessageThread";
import Product from "../../models/Product";
import UserData from "../../models/User";
import {
  fetchMessage,
  fetchMessageThread,
} from "../../services/Firebase/communicationService";
import {
  fetchSingleProduct,
  fetchUser,
} from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/NavBar";

export default function Chats() {
  const userDetails = useLocation().state as UserData;

  const [conversations, setConversations] = useState<MessageContainer[]>([]);

  const [messageThreads, setMessageThreads] = useState<MessageThread[]>([]);
  const [messageThreadFetched, setMessageThreadFetched] = useState(false);

  const [loading, setLoading] = useState(false);

  const [currentConversation, setCurrentConversation] = useState<Message[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product>();
  const [currentChathead, setCurrentChathead] = useState<UserData>();

  useEffect(() => {
    if (!messageThreadFetched) {
      getMessageThreads();
    }
  }, []);

  useEffect(() => {
    if (messageThreadFetched && messageThreads) {
      buildThread();
    }
  }, [messageThreads]);

  const getMessageThreads = async () => {
    setLoading(true);
    const messageThreadsArray = await fetchMessageThread(userDetails.userId);
    if (messageThreadsArray) {
      setMessageThreads(messageThreadsArray);
      setMessageThreadFetched(true);
    }
  };

  const buildThread = async () => {
    let conversationArray: MessageContainer[] = [];
    messageThreads.forEach(async (messageThread) => {
      const messages = await fetchMessage(messageThread.messageThreadId);
      const product = await fetchSingleProduct(messageThread.productId);
      const receiver = (await fetchUser(messageThread.receiverId)) as UserData;
      if (messages && product) {
        const conversationArrayIndex = {
          messageThread: messageThread,
          messages: messages,
          product: product,
          receiver: receiver,
        };
        conversationArray.push(conversationArrayIndex);
      }
    });
    setConversations(conversationArray);
    const timeout = setTimeout(() => setLoading(false), 2500);
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
                          {conversations.map((conversation, index) => {
                            return (
                              <>
                                <li
                                  key={index}
                                  className="person active-user"
                                  onClick={() => {
                                    setCurrentConversation(
                                      conversation.messages
                                    );
                                    setCurrentProduct(conversation.product);
                                    setCurrentChathead(conversation.receiver);
                                  }}
                                >
                                  <div className="user">
                                    <img
                                      src={require("../../assets/images/user.png")}
                                    />
                                  </div>
                                  <p className="name-time">
                                    <span className="name">{`${conversation.receiver.firstName} ${conversation.receiver.lastName}`}</span>
                                  </p>
                                </li>
                              </>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-9 col-9">
                      {currentConversation.length > 0 &&
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
                                width: "80px",
                              }}
                            />
                            <div className="product-disp-title">
                              <h2>{currentProduct.productName}</h2>
                              <h3>{currentProduct.productPrice}</h3>
                            </div>
                            {/* Leave a review to the "Buyer"? */}
                            <Button className="btn-review">
                              Leave a review
                            </Button>
                            <Button className="btn-trans">
                              Complete Transaction
                            </Button>
                          </div>
                          <hr />

                          <div className="chat-container">
                            <ul className="chat-box chatContainerScroll">
                              {currentConversation.map((message, index) => {
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
                                          <div className="chat-avatar">
                                            <img
                                              src={require("../../assets/images/user.png")}
                                            />
                                            <div className="chat-name">
                                              {userDetails.firstName}
                                            </div>
                                          </div>
                                          <div className="chat-text">
                                            {message.messageContent}
                                          </div>
                                        </li>
                                      </>
                                    )}
                                  </>
                                );
                              })}
                            </ul>
                            <div className="form-group">
                              <textarea
                                className="form-control"
                                rows={3}
                                placeholder="Type your message here..."
                              ></textarea>
                              <Button className="btn-trans">
                                Send Message
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <h3>No Conversations yet</h3>
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

{
  /* <>
{currentConversation.map((message, index) => {
  currentChathead.userId === message.fromId ? (
    <>
      <li key={index} className="chat-left">
        <div className="chat-avatar">
          <img
            src="../../assets/images/user.png"
            alt="Retail Admin"
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
        <div className="chat-avatar">
          <img
            src="../../assets/images/user.png"
            alt="Retail Admin"
          />
          <div className="chat-name">
            {userDetails.firstName}
          </div>
        </div>
        <div className="chat-text">
          {message.messageContent}
        </div>
      </li>
    </>
  );
})}
</> */
}
