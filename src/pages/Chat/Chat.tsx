import Navigation from "../Components/Navigation";
import "../../assets/styles/Chat.css";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import UserData from "../../models/User";
import Product from "../../models/Product";
import { useState } from "react";
import MessageThread from "../../models/MessageThread";
import Message from "../../models/Message";

export default function chats() {
  const state = useLocation().state as UserData;
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const [messageThread, setMessageThread] = useState<MessageThread[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  return (
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
                        <input className="form-control" placeholder="Search" />
                        <div className="input-group-btn">
                          <button type="button" className="btn btn-info">
                            <i className="fa fa-search"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <ul className="users">
                      <li className="person active-user" data-chat="person1">
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
                          <br /> I need more information about Developer Plan.
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
                          Project has been already finished and I have results
                          to show you.
                        </div>
                      </li>
                      <li className="chat-right">
                        <div className="chat-text">
                          Well I am not sure.
                          <br />I have results to show you.
                        </div>
                        <div className="chat-avatar">
                          <img
                            src="https://www.bootdey.com/img/Content/avatar/avatar5.png"
                            alt="Retail Admin"
                          />
                          <div className="chat-name">Joyse</div>
                        </div>
                      </li>
                    </ul>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Type your message here..."
                      ></textarea>

                      <p className="priceOffer">
                        <b>Offer: </b>
                        <span>Php </span>
                        <input type={"number"} placeholder="0" />
                        <button>Make Offer</button>
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
  );
}
