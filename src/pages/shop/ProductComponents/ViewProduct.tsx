import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../assets/styles/ViewProduct.css";
import Product from "../../../models/Product";
import UserData from "../../../models/User";
import {
  createNewMessageThread,
  validateIfThreadExists,
} from "../../../services/Firebase/communicationService";
import {
  addUserFavorite,
  fetchSingleProduct,
  fetchUser,
  removeFromUserFavorites,
  validateIfFavorite,
} from "../../../services/Firebase/productService";
import { createTransaction } from "../../../services/Firebase/transactionService";
import Loading from "../../Components/LoadingScreen";
import Navigation from "../../Components/NavBar";

interface stateType {
  product: string;
  user: UserData;
}

export default function ViewProduct() {
  const userDetails = useLocation().state as stateType;

  const [productDetails, setProductDetails] = useState<Product>();
  const [sellerDetails, setSellerDetails] = useState<UserData>();

  const [messageThreads, setMessageThreads] = useState(false);

  const [offer, setOffer] = useState(0);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //Show Modal Voucher
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Handle like products
  const [validated, setValidated] = useState(false);
  const [like, setLike] = useState(false);
  const handleLike = async () => {
    if (!userDetails.user.userId) {
      return setShow(true);
    }

    if (!validated) {
      addUserFavorite(userDetails.product, userDetails.user.userId);
      setLike(!like);
    }
  };

  const handleRemove = async () => {
    if (validated) {
      removeFromUserFavorites(userDetails.product, userDetails.user.userId);
      setLike(!like);
      setShowModal(false);
    }
  };

  //Handle Confirmation Modal
  const [showModal, setShowModal] = useState(false);
  const closeConfirmation = () => setShowModal(false);
  const acceptConfirmation = () => handleRemove();

  useEffect(() => {
    if (validated === false) {
      if (userDetails.user && productDetails) {
        validateIfUserFavorite(
          userDetails.user.userId,
          productDetails.productId
        );
      }
    }

    if (dataFetched === false) {
      fetchProductData(userDetails.product);
      fetchUserMessageThreads(userDetails.user.userId, userDetails.product);

      if (productDetails?.productId) {
        fetchSellerData(productDetails.userId);
        const initialPriceOffer = productDetails.productPrice;
        setOffer(initialPriceOffer);
        setLoading(false);
        setDataFetched(true);
      }
    }
  });

  async function validateIfUserFavorite(userId: string, productId: string) {
    const isValidated = await validateIfFavorite(userId, productId);
    if (isValidated) {
      setLike(isValidated);
      setValidated(true);
    }
  }

  async function fetchProductData(productId: string) {
    const fetchedProduct = await fetchSingleProduct(productId);
    if (fetchedProduct.productId) {
      setProductDetails(fetchedProduct);
    }
  }

  async function fetchSellerData(userId: string) {
    const fetchedSeller = (await fetchUser(userId)) as UserData;
    if (fetchedSeller.userId) {
      setSellerDetails(fetchedSeller);
    }
  }

  async function fetchUserMessageThreads(userId: string, productId: string) {
    const validateThread = await validateIfThreadExists(userId, productId);
    setMessageThreads(validateThread);
  }

  async function createOffer() {
    if (!userDetails.user.userId) {
      return setShow(true);
    }
    setLoading(true);
    if (sellerDetails && userDetails.user && productDetails) {
      const message = {
        senderId: userDetails.user.userId,
        receiverId: sellerDetails.userId,
        productId: productDetails.productId,
        messageContent: `Hey! are you willing to accept my offer ${offer}`,
      };

      const messageStatus = await createNewMessageThread(
        message.senderId,
        message.receiverId,
        message.productId,
        message.messageContent
      );

      const transactionStatus = await createTransaction(
        productDetails.productId,
        userDetails.user.userId,
        sellerDetails.userId,
        "PENDING"
      );

      if (messageStatus && transactionStatus) {
        setLoading(false);
        navigate("/chat", { state: userDetails.user });
      }
    }
  }

  function Confirmation() {
    return (
      <>
        <Modal show={showModal} onHide={closeConfirmation}>
          <Modal.Header closeButton>
            <Modal.Title>
              Are you sure you want to remove from favorites
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeConfirmation}>
              No
            </Button>
            <Button variant="primary" onClick={acceptConfirmation}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
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
          <Confirmation />
          <section className="details">
            <h3>product</h3>
            <div className="product-con">
              <img
                className="product-img"
                src={productDetails?.imageUrl}
                style={{ width: "50%", height: "auto" }}
                alt=""
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
                  {like ? (
                    <img
                      src="/images/heartfilled.svg"
                      className="liked-heart"
                      alt=""
                      onClick={() => setShowModal(!showModal)}
                    />
                  ) : (
                    <img
                      src="/images/heart.svg"
                      className="liked-heart"
                      alt=""
                      onClick={handleLike}
                    />
                  )}
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
            {!messageThreads ? (
              <>
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
                        value={offer}
                        onChange={(e) => {
                          setOffer(e.target.valueAsNumber);
                        }}
                      />
                    </p>
                  </Col>
                  <Col className="makeoffer-btn">
                    <button onClick={() => createOffer()}>Make Offer</button>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Link to={"/chat"} state={userDetails.user}>
                  <h3>Go to Message Thread</h3>
                </Link>
              </>
            )}
          </div>
          <Modal show={show} centered>
            <Modal.Header>
              <h3>Login an account</h3>
            </Modal.Header>
            <Modal.Body
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "5% 5%",
              }}
            >
              <Button
                className="m-lg-2 btn-info"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button
                className="m-lg-2 btn-primary"
                onClick={() => {
                  navigate("/register");
                }}
              >
                {" "}
                Register{" "}
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
}
