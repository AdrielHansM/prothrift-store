import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Profile.css";
import Product from "../../models/Product";
import UserData from "../../models/User";
import { fetchProducts } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/Navigation";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";

export default function Shop() {
  const userDetails = useLocation().state as UserData;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showInfo, setShowInfo] = useState(false);
  const handleCloseInfo = () => setShowInfo(false);
  const handleShowInfo = () => setShowInfo(true);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {console.log(products)}
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
              <Col>
                <div className="coupon_box">
                  <div className="coupon-body">
                    <h2 className="how_much">
                      {" "}
                      <b> 5% </b>{" "}
                    </h2>
                    <h3> OFF </h3>
                  </div>
                  <button className="redeem-btn" onClick={handleShow}>
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
                      <b> 15% </b>{" "}
                    </h2>
                    <h3> OFF </h3>
                  </div>
                  <button className="redeem-btn" onClick={handleShow}>
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
                      <b> 25% </b>{" "}
                    </h2>
                    <h3> OFF </h3>
                  </div>
                  <button className="redeem-btn" onClick={handleShow}>
                    {" "}
                    Redeem{" "}
                  </button>
                </div>
              </Col>
            </Row>
          </Container>
          <Modal show={show} centered>
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

          <Modal show={showInfo} centered>
            <Modal.Body
              style={{
                textAlign: "center",
                fontSize: "30px",
                padding: "10% 5%",
              }}
            >
              To be able to redeem a voucher, you need to collect atleast 10
              points for 5% Off, 20 points for 15% , and 30 points for 25% Off
              from logging in daily.
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
                          <div>
                            <img
                              src="/images/heart.svg"
                              className="liked-heart"
                              alt=""
                            />
                          </div>
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
