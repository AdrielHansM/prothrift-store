import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../../../models/Product";
import {
  fetchSingleProduct,
  getUser,
} from "../../../services/Firebase/productService";
import Loading from "../../Components/LoadingScreen";
import Navigation from "../../Components/Navigation";
import UserData from "../../../models/User";
import "../../../assets/styles/ViewProduct.css";
import { Row, Col, Modal, Button } from "react-bootstrap";
import {
  createNewMessageThread,
  fetchMessageThread,
} from "../../../services/Firebase/communicationService";
import MessageThread from "../../../models/MessageThread";

interface stateType {
  product: string;
  user: UserData;
}

export default function ViewProduct() {
  const state = useLocation().state as stateType;
  const [productDetails, setProductDetails] = useState<Product>();
  const [sellerDetails, setSellerDetails] = useState<UserData>();
  const [messageThreads, setMessageThreads] = useState<MessageThread[]>([]);
  const [offer, setOffer] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //Show Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (dataFetched === false) {
      if (state.product && state.user) {
        fetchProductData(state.product);
        fetchUserMessageThreads(state.user.userId, state.product);
        setLoading(false);
      }

      if (productDetails?.productId) {
        fetchSellerData(productDetails.userId);
        setLoading(false);
        setDataFetched(true);
      }
    }
  });

  async function fetchProductData(productId: string) {
    const fetchedProduct = await fetchSingleProduct(productId);
    if (fetchedProduct.productId) {
      setProductDetails(fetchedProduct);
    }
  }

  async function fetchSellerData(userId: string) {
    const fetchedSeller = (await getUser(userId)) as UserData;
    if (fetchedSeller.userId) {
      setSellerDetails(fetchedSeller);
    }
  }

  async function fetchUserMessageThreads(userId: string, productId: string) {
    const messageThreadsArray = await fetchMessageThread(userId);

    if (messageThreadsArray) {
      setMessageThreads(messageThreadsArray);
    }
  }

  async function createOffer() {
    setLoading(true);
    if (sellerDetails && state.user && productDetails) {
      const message = {
        senderId: state.user.userId,
        receiverId: sellerDetails.userId,
        productId: productDetails.productId,
        messageContent: `Hey! are willing to accept my offer ${offer}`,
      };
      const messageStatus = await createNewMessageThread(
        message.senderId,
        message.receiverId,
        message.productId,
        message.messageContent
      );

      if (messageStatus) {
        setLoading(false);
        navigate("/chat", { state: state.user });
      }
    }
  }

  return (
    <>
      {loading === true ? (
        <>
          <Navigation />
          <Loading />
        </>
      ) : (
        <>
          <Navigation />
          <section className="details">
            <h3>product</h3>
            <div className="product-con">
              <img
                className="product-img"
                src={productDetails?.imageUrl}
                style={{ width: "50%", height: "auto" }}
              />
              <div className="product-details">
                <p className="p-name">{productDetails?.productName}</p>
                <p className="price">₱{productDetails?.productPrice}</p>
                <p className="status">{productDetails?.status}</p>
                <p>
                  meet-up place: <strong>{productDetails?.meetup}</strong>
                </p>
                <p>
                  Description: <br />
                  {productDetails?.productDescription}
                </p>
                <div>
                  <button style={{ marginTop: "0", marginLeft: "5px" }}>
                    Add to Likes
                  </button>
                </div>
                <div className="seller-details">
                  <h2>seller:</h2>
                  <p>name: {sellerDetails?.firstName}</p>
                  <p>lastname: {sellerDetails?.lastName}</p>
                  <p>Contact: {sellerDetails?.contactNumber}</p>
                  <p>Email: {sellerDetails?.email}</p>
                </div>
              </div>
            </div>
          </section>
          <hr />
          <div>
            <Row className="offer-cont">
              <Col className="make-offer">
                <p className="price-input">
                  <b>Offer: </b>
                  <span>Php </span>
                  <input
                    type={"number"}
                    placeholder="0"
                    min={0}
                    required
                    onChange={(e) => {
                      setOffer(e.target.valueAsNumber);
                    }}
                  />
                </p>
              </Col>
              <Col className="voucher">
                <button onClick={handleShow}>Voucher</button>

                <Modal show={show} centered>
                  <Modal.Body
                    style={{
                      textAlign: "center",
                      fontSize: "30px",
                      padding: "20% 5%",
                    }}
                  >
                    You don't have any vouchers.
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Col>
              <Col className="makeoffer-btn">
                <button onClick={() => createOffer()}>Make Offer</button>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  );
}
