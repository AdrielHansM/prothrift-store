import { ChangeEvent, useEffect, useState } from "react";
import { Badge, Button, Card, Form, Modal } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "../../assets/styles/Chat.css";
import Message from "../../models/Message";
import MessageContainer from "../../models/MessageContainer";
import MessageThread from "../../models/MessageThread";
import Product from "../../models/Product";
import Review from "../../models/Review";
import Transaction from "../../models/Transaction";
import UserData from "../../models/User";
import Voucher from "../../models/Voucher";
import {
  fetchBuyerThread,
  fetchMessage,
  fetchSellerThread,
  sendMessage,
} from "../../services/Firebase/communicationService";
import {
  fetchSingleProduct,
  fetchUser,
  markProductAsSold,
  updateUserPoints,
} from "../../services/Firebase/productService";
import {
  applyVoucherToTransaction,
  createMaterialsRecycled,
  createUserReview,
  fetchTransaction,
  fetchVouchers,
  updateRelatedTransaction,
  updateTransaction,
  updateVoucher,
} from "../../services/Firebase/transactionService";
import { convertWeight } from "../../utils/productUtils";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/NavBar";

const initialReview = {
  reviewId: "",
  productId: "",
  sellerId: "",
  userId: "",
  rating: 0,
  review: "",
  dateUpdated: new Date(),
  dateCreated: new Date(),
};

export default function Chats() {
  const userDetails = useLocation().state as UserData;

  //Form Data
  const [formData, setFormData] = useState<Review>(initialReview);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Confirmation Modal
  const [showConfirmation, setShowConfirmation] = useState(false);
  const confirmationClose = () => setShowConfirmation(false);
  const confirmationShow = () => setShowConfirmation(true);

  //Voucher Modal
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [showVouchers, setShowVouchers] = useState(false);
  const voucherClose = () => setShowVouchers(false);
  const voucherShow = () => setShowVouchers(true);

  const [conversationsBuyer, setConversationsBuyer] = useState<
    MessageContainer[]
  >([]);
  const [conversationsSeller, setConversationsSeller] = useState<
    MessageContainer[]
  >([]);

  const [buyerThreads, setBuyerThreads] = useState<MessageThread[]>([]);
  const [sellerThreads, setSellerThreads] = useState<MessageThread[]>([]);

  const [messageThreadFetched, setMessageThreadFetched] = useState(false);

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
      getVouchers();
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

  const getVouchers = async () => {
    const vouchersArray = await fetchVouchers(userDetails.userId);
    if (vouchersArray) {
      setVouchers(vouchersArray);
    }
  };

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
    const timeout = setTimeout(() => setLoading(false), 1500);
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

  const sendMessageProcess = async (threadId: string, message: string) => {
    if (message) {
      sendMessage(threadId, userDetails.userId, message);

      const newMessage = {
        messageId: "",
        fromId: userDetails.userId,
        messageContent: message,
        dateCreated: new Date(),
      };
      const messages: Message[] = currentMessages;
      messages.push(newMessage);
      setCurrentMessages(messages);
      setMessageToSend("");
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const applyVoucher = async (voucherId: string, voucherValue: number) => {
    if (currentThread && currentTransaction) {
      sendMessageProcess(
        currentThread.messageThreadId,
        `Voucher valued at ${voucherValue} is applied`
      );

      applyVoucherToTransaction(voucherId, currentTransaction.transactionId);

      updateVoucher(voucherId);

      //Update transaction
      setCurrentTransaction({
        transactionId: currentTransaction.transactionId,
        productId: currentTransaction.productId,
        buyerId: currentTransaction.buyerId,
        sellerId: currentTransaction.sellerId,
        transactionStatus: currentTransaction.transactionStatus,
        voucherApplied: true,
        dateUpdated: new Date(),
        dateCreated: currentTransaction.dateCreated,
      });

      voucherClose();
    }
  };

  const writeUserReviews = async () => {
    if (currentProduct && currentChathead && formData) {
      createUserReview(
        currentProduct.productId,
        currentChathead.userId,
        userDetails.userId,
        Math.floor(formData.rating),
        formData.review
      );
    }
  };

  const completeTransaction = async () => {
    if (currentTransaction && currentProduct && currentChathead) {
      const updateSuccess = await updateTransaction(
        currentTransaction.transactionId,
        "SUCCESS"
      );
      setCurrentTransaction({
        transactionId: currentTransaction.transactionId,
        productId: currentTransaction.productId,
        buyerId: currentTransaction.buyerId,
        sellerId: currentTransaction.sellerId,
        transactionStatus: "SUCCESS",
        voucherApplied: currentTransaction.voucherApplied,
        dateUpdated: new Date(),
        dateCreated: currentTransaction.dateCreated,
      });
      if (updateSuccess) {
        updateRelatedTransaction(
          currentProduct.productId,
          currentChathead.userId,
          "COMPLETED"
        );
        //For seller
        createMaterialsRecycled(
          currentProduct.productId,
          currentProduct.productName,
          userDetails.userId,
          convertWeight("lbs", currentProduct.productWeight)
        );
        updateUserPoints(
          userDetails.userId,
          userDetails.points +
            Math.ceil(convertWeight("lbs", currentProduct.productWeight))
        );
        //For buyer
        createMaterialsRecycled(
          currentProduct.productId,
          currentProduct.productName,
          currentChathead.userId,
          convertWeight("lbs", currentProduct.productWeight)
        );
        updateUserPoints(
          currentChathead.userId,
          currentChathead.points +
            Math.ceil(convertWeight("lbs", currentProduct.productWeight))
        );

        //For Product
        markProductAsSold(currentProduct.productId);
      }
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
                              <h2>
                                {currentProduct.productName}{" "}
                                {currentProduct.isSold ? (
                                  <Badge className="m-lg-2" bg="secondary">
                                    Sold
                                  </Badge>
                                ) : (
                                  ""
                                )}
                              </h2>
                              <h3>₱{currentProduct.productPrice}</h3>
                            </div>
                            {currentTransaction.buyerId ===
                            userDetails.userId ? (
                              currentTransaction.transactionStatus ===
                              "SUCCESS" ? (
                                <div>
                                  <Button
                                    className="btn-trans"
                                    onClick={handleShow}
                                  >
                                    Leave a review
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  {currentTransaction.voucherApplied ? (
                                    <div>
                                      <Button
                                        className="mt-2 btn-secondary"
                                        disabled
                                      >
                                        Apply Voucher
                                      </Button>
                                    </div>
                                  ) : (
                                    <div>
                                      <Button
                                        className="mt-2 btn-primary"
                                        onClick={voucherShow}
                                      >
                                        Apply Voucher
                                      </Button>
                                    </div>
                                  )}
                                  <div>
                                    <Button
                                      className="m-lg-2 btn-secondary"
                                      disabled
                                    >
                                      Leave a review
                                    </Button>
                                  </div>
                                </>
                              )
                            ) : currentTransaction.transactionStatus ===
                              "PENDING" ? (
                              <div>
                                <Button
                                  className="m-lg-4 btn-review"
                                  onClick={confirmationShow}
                                >
                                  Complete Transaction
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <Button
                                  className="m-lg-4 btn-secondary"
                                  disabled
                                >
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
                                onClick={() => {
                                  if (messageToSend) {
                                    sendMessageProcess(
                                      currentThread.messageThreadId,
                                      messageToSend
                                    );
                                  }
                                }}
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

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Rating (1 lowest - 5 highest)</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={5}
                    onChange={handleChange}
                    placeholder="enter rating..."
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Write Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="write a review..."
                    onChange={handleChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  writeUserReviews();
                }}
              >
                Submit Review
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showConfirmation} centered>
            <Modal.Body
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "5% 1%",
              }}
            >
              Are you sure you want to complete transaction?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={confirmationClose}>
                No
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  confirmationClose();
                  completeTransaction();
                }}
              >
                Yes
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showVouchers} centered>
            <Modal.Header>
              <h3>Vouchers</h3>
            </Modal.Header>
            <Modal.Body
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "5% 1%",
              }}
            >
              {vouchers.map((voucher, index) => {
                var formattedDate = new Date(1970, 0, 1); // Epoch
                //@ts-ignore
                const dateCreated = voucher.dateCreated.seconds;
                formattedDate.setSeconds(dateCreated);
                return (
                  <Card key={index} className="m-lg-4 voucher-card">
                    <Card.Header>
                      <p>
                        <strong>ID: </strong>
                        {voucher.voucherId}
                        OFF
                      </p>
                      <h4>
                        <strong>Discount:</strong> Php {voucher.voucherValue}{" "}
                        OFF
                      </h4>
                    </Card.Header>
                    <Card.Body>
                      {voucher.isUsed ? (
                        <Button className="btn-secondary" disabled>
                          Voucher is applied
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            applyVoucher(
                              voucher.voucherId,
                              voucher.voucherValue
                            );
                            alert("Voucher successfully applied");
                            setTimeout(() => {
                              window.location.reload();
                            }, 1000);
                          }}
                        >
                          Apply Voucher
                        </Button>
                      )}
                    </Card.Body>
                  </Card>
                );
              })}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={voucherClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
