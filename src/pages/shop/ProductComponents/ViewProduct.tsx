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

interface stateType {
  product: string;
  user: UserData;
}

export default function ViewProduct() {
  const state = useLocation().state as stateType;
  const [productDetails, setProductDetails] = useState<Product>();
  const [sellerDetails, setSellerDetails] = useState<UserData>();
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();
  
  //Show Modal  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    if (state.product) {
      fetchProductData(state.product);
      setLoading(false);
    }

    if (productDetails?.productId) {
      fetchSellerData(productDetails.userId);
      setLoading(false);
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
                <p>meet-up place: {productDetails?.meetup}</p>
                <p>{productDetails?.productDescription}</p>
                <div>
                  {/* <img
                    src="/images/heart1.png"
                    className="liked-heart"
                    alt=""
                  /> */}
                  <button style={{marginTop:'0', marginLeft:'5px'}}>Add to Likes</button>
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
          <hr/>
          <div>
            <Row className="offer-cont">
                <Col className="make-offer">
                    <p className="price-input"><b>Offer: </b> 
                      <span>Php </span>
                    <input type={"number"} placeholder="0"/>
                    </p>
                </Col>
                <Col className="voucher">

                    <button onClick={handleShow}>
                        Voucher
                    </button>

                    <Modal 
                      show={show} 
                      centered
                    >
                      <Modal.Body style={{textAlign:'center', fontSize:'30px', padding:'20% 5%'}}>You don't have any vouchers.</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                </Col>
                <Col className="makeoffer-btn">
                    <button onClick={() => navigateTo("/chat")}>
                        Make Offer
                    </button>
                </Col>  
            </Row>
          </div>
        </>
      )}
    </>
  );
}
