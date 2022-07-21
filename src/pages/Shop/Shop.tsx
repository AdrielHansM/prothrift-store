import { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "../../assets/styles/Profile.css";
import Product from "../../models/Product";
import UserData from "../../models/User";
import {
  fetchProducts,
  updateUserPoints,
} from "../../services/Firebase/productService";
import { createVoucher } from "../../services/Firebase/transactionService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/NavBar";

export default function Shop() {
  const userDetails = useLocation().state as UserData;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentVoucherValue, setCurrentVoucherValue] = useState(0);

  useEffect(() => {
    if (products.length === 0 && userDetails) {
      getProducts();
    }
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const productArray = await fetchProducts(userDetails.userId);
    if (productArray) {
      setProducts(productArray);
      setLoading(false);
    }
  };

  const [showNotEnough, setShoeNotEnough] = useState(false);
  const handleClose = () => setShoeNotEnough(false);
  const handleShow = () => setShoeNotEnough(true);

  const [purchaseConfirmation, setPurchaseConfirmation] = useState(false);
  const confirmationClose = () => setPurchaseConfirmation(false);
  const confirmationShow = (voucherValue: number) => {
    setCurrentVoucherValue(voucherValue);
    setPurchaseConfirmation(true);
  };

  const purchaseVoucher = async () => {
    if (currentVoucherValue <= userDetails.points) {
      createVoucher(currentVoucherValue, userDetails.userId);
      updateUserPoints(
        userDetails.userId,
        userDetails.points - currentVoucherValue
      );
      userDetails.points = userDetails.points - currentVoucherValue;
      confirmationClose();
      setTimeout(() => alert("Voucher Purchased"), 750);
    } else {
      confirmationClose();
      handleShow();
    }
  };

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navigation />
          <div
            className="hero-section"
            style={{ backgroundImage: "url(/images/header.png)" }}
          >
            <div className="content">
              <h2>Our users are superheroes!</h2>
            </div>
          </div>
          <br />

          <Container
            style={{
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#EAEAEB",
            }}
          >
            <img
              src="/images/info.png"
              className="info-img"
              onClick={handleShowInfo}
            />
            <Row>
              <h4>Points: {userDetails.points}</h4>
              <Col>
                <div className="coupon_box">
                  <div className="coupon-body">
                    <h2 className="how_much">
                      {" "}
                      <b> 10 Peso </b>{" "}
                    </h2>
                    <h3> OFF </h3>
                  </div>
                  <button
                    className="redeem-btn"
                    onClick={() => confirmationShow(10)}
                  >
                    {" "}
                    Redeem{" "}
                  </button>
                </div>
              </Col>
              <Col>
                <div className="coupon_box2">
                  <div className="coupon-body2">
                    <h2 className="how_much">
                      {" "}
                      <b> 20 Peso </b>{" "}
                    </h2>
                    <h3> OFF </h3>
                  </div>
                  <button
                    className="redeem-btn"
                    onClick={() => confirmationShow(20)}
                  >
                    {" "}
                    Redeem{" "}
                  </button>
                </div>
              </Col>
              <Col>
                <div className="coupon_box3">
                  <div className="coupon-body3">
                    <h2 className="how_much">
                      {" "}
                      <b> 30 Peso </b>{" "}
                    </h2>
                    <h3> OFF </h3>
                  </div>
                  <button
                    className="redeem-btn"
                    onClick={() => confirmationShow(30)}
                  >
                    {" "}
                    Redeem{" "}
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
          <Modal show={showNotEnough} centered>
            <Modal.Body
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "20% 5%",
              }}
            >
              You don't have enough points.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={purchaseConfirmation} centered>
            <Modal.Body
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "20% 5%",
              }}
            >
              Are you sure you want to buy this voucher?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={confirmationClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  purchaseVoucher();
                }}
              >
                Buy
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showInfo} centered>
            <Modal.Body
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "0 5%",
                paddingTop:"7%"
              }}
            >
              Voucher conversion is 1 point equal to 1 Php
              <p className="voucher-note">Note: You get a point every time a transaction is completed</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseInfo}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>

          <section>
            <h2 className="product-category2">Products</h2>
            <div className="product-container2">
              {products.map((product, index) => {
                return (
                  <>
                    <Link
                      className="product-link"
                      to={"/view-product"}
                      state={{ user: userDetails, product: product.productId }}
                    >
                      <div key={index} className="product-card">
                        <div className="product-image">
                          <img
                            src={product.imageUrl}
                            className="product-thumb"
                            alt=""
                          />
                          <button className="card-btn">Buy Product</button>
                        </div>
                        <div className="product-info">
                          <h2 className="product-brand">
                            {product.productName}
                          </h2>
                          <p className="product-short-des">
                            {product.productDescription}
                          </p>
                          <span className="price">₱{product.productPrice}</span>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>
          </section>
          <br />
          <Footer />
        </>
      )}
    </>
  );
}
