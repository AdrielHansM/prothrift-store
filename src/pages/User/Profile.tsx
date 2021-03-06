import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navigation from "../Components/NavBar";
import UserData from "../../models/User";
import Product from "../../models/Product";
import Transaction from "../../models/Transaction";
import "../../assets/styles/UserProfile.css";
import { Tabs, Tab, Card, Badge, Row, Accordion, Table } from "react-bootstrap";
import { fetchProductsByProfile } from "../../services/Firebase/productService";
import {
  fetchMaterialsRecycled,
  fetchUserTotalSaved,
} from "../../services/Firebase/transactionService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Voucher from "../../models/Voucher";
import Review from "../../models/Review";
import {
  fetchTransactionsBuyer,
  fetchTransactionsSeller,
  fetchUserReviews,
  fetchVouchers,
} from "../../services/Firebase/transactionService";
import MaterialsRecycledByUser from "../../models/MaterialsRecycledByUser";

export default function Profile() {
  const navigate = useNavigate();
  const userDetails = useLocation().state as UserData;

  const [transactionsSeller, setTransactionsSeller] = useState<Transaction[]>(
    []
  );
  const [transactionsBuyer, setTransactionsBuyer] = useState<Transaction[]>([]);
  const [materialsRecycled, setMaterialsRecycled] =
    useState<MaterialsRecycledByUser>();
  const [products, setProducts] = useState<Product[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      products.length === 0 &&
      vouchers.length === 0 &&
      transactionsSeller.length === 0 &&
      transactionsBuyer.length === 0 &&
      !materialsRecycled
    ) {
      getProducts();
      getVouchers();
      getTransactionSeller();
      getTransactionBuyer();
      getReviews();
      getMaterialsSaved();
    }
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const productArray = await fetchProductsByProfile(userDetails.userId);
    if (productArray) {
      setProducts(productArray);
    }
  };

  const getVouchers = async () => {
    const voucherArray = await fetchVouchers(userDetails.userId);
    if (voucherArray) {
      setVouchers(voucherArray);
    }
  };

  const getTransactionSeller = async () => {
    const transactionsSellerArray = await fetchTransactionsSeller(
      userDetails.userId
    );
    if (transactionsSellerArray) {
      setTransactionsSeller(transactionsSellerArray);
    }
  };

  const getTransactionBuyer = async () => {
    const transactionsBuyerArray = await fetchTransactionsBuyer(
      userDetails.userId
    );
    if (transactionsBuyerArray) {
      setTransactionsBuyer(transactionsBuyerArray);
    }
  };

  const getReviews = async () => {
    const reviewsArray = await fetchUserReviews(userDetails.userId);
    if (reviewsArray) {
      setReviews(reviewsArray);
      setLoading(false);
    }
  };

  const getMaterialsSaved = async () => {
    const materialsSaved = await fetchMaterialsRecycled(userDetails.userId);
    if (materialsSaved) {
      console.log(materialsSaved);
      setMaterialsRecycled(materialsSaved);
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
            <div className="row-profile">
              <div id="content" className="content content-full-width">
                <div className="profile-header">
                  <div className="profile-header-cover"></div>

                  <div className="profile-header-content">
                    <div className="profile-header-img">
                      <img src="/images/user-profile.png" alt="" />
                    </div>

                    <div className="profile-header-info">
                      <h4>{`${userDetails?.firstName} ${userDetails?.lastName}`}</h4>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate("/editprofile", { state: userDetails })
                        }
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <Tabs
                defaultActiveKey="list"
                transition={false}
                id="noanim-tab-example"
                className="tab-col"
              >
                <Tab eventKey="list" title="LISTS">
                  <div className="product-container3">
                    {products.map((product, index) => {
                      return (
                        <>
                          <Link
                            className="product-link"
                            to={"/viewlisted-products"}
                            state={{
                              user: userDetails,
                              product: product.productId,
                            }}
                          >
                            <div key={index} className="product-card">
                              <div className="product-image">
                                <img
                                  src={product.imageUrl}
                                  className="product-thumb"
                                  alt=""
                                />
                              </div>
                              <div className="product-info">
                                <h4 className="product-brand">
                                  {product.productName}
                                  {product.isSold ? (
                                    <Badge className="m-lg-2" bg="secondary">
                                      Sold
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </h4>
                                <p className="product-short-des">
                                  {product.productDescription}{" "}
                                </p>
                                <span className="price">
                                  ???{product.productPrice}
                                </span>
                              </div>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                  </div>
                </Tab>

                <Tab eventKey="transactions" title="TRANSACTIONS">
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Products Bought</Accordion.Header>
                      <Accordion.Body>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>ID#</th>
                              <th>Transaction Status</th>
                              <th>Date of Transaction</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactionsBuyer.map(
                              (transactionBuyer, index) => {
                                var formattedDate = new Date(1970, 0, 1); // Epoch
                                const dateCreated =
                                  //@ts-ignore
                                  transactionBuyer.dateCreated.seconds;
                                formattedDate.setSeconds(dateCreated);
                                return (
                                  <tr key={index}>
                                    <td>{transactionBuyer.transactionId}</td>
                                    <td>
                                      {transactionBuyer.transactionStatus}
                                    </td>
                                    <td>{formattedDate.toDateString()}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Products Sold</Accordion.Header>
                      <Accordion.Body>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>ID#</th>
                              <th>Transaction Status</th>
                              <th>Date of Transaction</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactionsSeller.map(
                              (transactionSeller, index) => {
                                var formattedDate = new Date(1970, 0, 1); // Epoch
                                const dateCreated =
                                  //@ts-ignore
                                  transactionSeller.dateCreated.seconds;
                                formattedDate.setSeconds(dateCreated);
                                return (
                                  <tr key={index}>
                                    <td>{transactionSeller.transactionId}</td>
                                    <td>
                                      {transactionSeller.transactionStatus}
                                    </td>
                                    <td>{formattedDate.toDateString()}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab>

                <Tab eventKey="reviews" title="REVIEWS">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="media g-mb-30 media-comment">
                          <>
                            {reviews.map((review, index) => {
                              return (
                                <>
                                  <img
                                    src={require("../../assets/images/user.png")}
                                    alt=""
                                    style={{
                                      width: "45px",
                                      height: "45px",
                                      marginBottom: "-55px",
                                    }}
                                  />
                                  <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                                    <div className="g-mb-15">
                                      <h5>Rating: {review.rating}</h5>
                                    </div>

                                    <p style={{ textTransform: "none" }}>
                                      {review.review}
                                    </p>
                                  </div>
                                </>
                              );
                            })}
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="voucher" title="VOUCHERS">
                  <div className="main-voucher-con">
                    {vouchers.length > 0 ? (
                      <>
                        {vouchers.map((voucher, index) => {
                          var t = new Date(1970, 0, 1); // Epoch
                          //@ts-ignore
                          const dateCreated = voucher.dateCreated.seconds;
                          t.setSeconds(dateCreated);
                          return (
                            <Card key={index} className="voucher-con">
                              <Card.Header>
                                <>
                                  <h4>Voucher ID: {voucher.voucherId}</h4>
                                  <p>
                                    <strong>date purchased: </strong>(
                                    <i>{t.toDateString()}</i>)
                                  </p>
                                </>
                              </Card.Header>
                              <Card.Body>
                                <h3>
                                  <strong>Discount:</strong> Php{" "}
                                  {voucher.voucherValue} OFF{" "}
                                  {voucher.isUsed ? (
                                    <Badge className="m-lg-2" bg="secondary">
                                      Used
                                    </Badge>
                                  ) : (
                                    ""
                                  )}
                                </h3>
                              </Card.Body>
                            </Card>
                          );
                        })}
                      </>
                    ) : (
                      <>
                        <p className="no-voucher">
                          You don't have any vouchers
                        </p>
                      </>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="progress" title="PROGRESS">
                  <div className="user-prog">
                    <p>You potentially saved</p>
                    {materialsRecycled?.totalMaterialsReycled.toFixed(2)}
                    <div className="pounds-text">
                      <div>Pounds</div>
                      <div>of Clothes</div>
                    </div>
                  </div>
                  <Accordion>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Materials Recycled Breakdown
                      </Accordion.Header>
                      <Accordion.Body>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>ID#</th>
                              <th>Weight Recycled(lbs)</th>
                              <th>Date of Transaction</th>
                            </tr>
                          </thead>
                          <tbody>
                            {materialsRecycled?.materialsRecycled.map(
                              (breakdown, index) => {
                                var formattedDate = new Date(1970, 0, 1); // Epoch
                                const dateCreated =
                                  //@ts-ignore
                                  breakdown.dateCreated.seconds;
                                formattedDate.setSeconds(dateCreated);
                                return (
                                  <tr key={index}>
                                    <td>{breakdown.materialId}</td>
                                    <td>
                                      {breakdown.weightRecycled.toFixed(2)}
                                    </td>
                                    <td>{formattedDate.toDateString()}</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </Table>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Tab>
              </Tabs>
            </div>
          </div>
          <br />
          <Footer />
        </>
      )}
    </>
  );
}
