import Navigation from "../Components/Navigation";
import "../../assets/styles/Chat.css";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import UserData from "../../models/User";
import Product from "../../models/Product";
import { useEffect, useState } from "react";
import MessageThread from "../../models/MessageThread";
import Message from "../../models/Message";
import {
  fetchMessage,
  fetchMessageThread,
} from "../../services/Firebase/communicationService";
import Loading from "../Components/LoadingScreen";
import MessageContainer from "../../models/MessageContainer";
import {
  fetchSingleProduct,
  fetchUser,
} from "../../services/Firebase/productService";
import { Button } from "react-bootstrap";

export default function Chats() {
  const userDetails = useLocation().state as UserData;

  const [conversations, setConversations] = useState<MessageContainer[]>([]);

  const [messageThreads, setMessageThreads] = useState<MessageThread[]>([]);
  const [messageThreadFetched, setMessageThreadFetched] = useState(false);

  const [loading, setLoading] = useState(false);

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
          {conversations.map((conversation, index) => {
            console.log("Thread: ", conversation.messageThread);
            console.log("Message: ", conversation.messages);
            console.log("Product: ", conversation.product);
            console.log("Receiver: ", conversation.receiver);

            conversation.messages.forEach((message) => {
              console.log(message.messageContent);
            });
          })}
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
                          <li
                            className="person active-user"
                            data-chat="person1"
                          >
                            <div className="user">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                alt="Retail Admin"
                              />
                            </div>
                            <p className="name-time">
                              <span className="name">Emily Russell</span>
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-9 col-9">
                      <div className="selected-user">
                        <span>
                          To: <span className="name">Emily Russell</span>
                        </span>
                      </div>
                      <hr/>

                      <div className="product-display">
                        <img 
                          src="/images/Boys-Shirts.jpg" alt="" 
                          style={{
                            width:'80px',
                            height:'auto'
                          }}/>
                        <div className="product-disp-title">
                          <h2>
                            Kid's Polo-shirt
                          </h2>
                          <h3>
                            ₱249
                          </h3>  
                        </div>
                        {/* Leave a review to the "Buyer"? */}
                        <Button className="btn-review">Leave a review</Button>
                      </div>
                      <hr/>
                      
                      <div className="chat-container">
                        <ul className="chat-box chatContainerScroll">
                          <li className="chat-left">
                            <div className="chat-avatar">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                alt="Retail Admin"
                              />
                              <div className="chat-name">Russell</div>
                            </div>
                            <div className="chat-text">
                              Hello, I'm Russell.
                              <br />
                              How can I help you today?
                            </div>
                          </li>
                          <li className="chat-right">
                            <div className="chat-text">
                              Hi, Russell
                              <br /> I need more information about Developer
                              Plan.
                            </div>
                            <div className="chat-avatar">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                                alt="Retail Admin"
                              />
                              <div className="chat-name">Sam</div>
                            </div>
                          </li>
                          <li className="chat-left">
                            <div className="chat-avatar">
                              <img
                                src="https://www.bootdey.com/img/Content/avatar/avatar3.png"
                                alt="Retail Admin"
                              />
                              <div className="chat-name">Russell</div>
                            </div>
                            <div className="chat-text">
                              Are we meeting today?
                              <br />
                              Project has been already finished and I have
                              results to show you.
                            </div>
                          </li>
                        </ul>
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            rows={3}
                            placeholder="Type your message here..."
                          />

                          <p className="priceOffer">
                            <b>Offer: </b>
                            <span>Php </span>
                            <input type={"number"} placeholder="0" />
                            <Button>Make Offer</Button>
                            <Button className="btn-trans">Complete Transaction</Button>
                          </p>
                        </div>
                      </div>
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
