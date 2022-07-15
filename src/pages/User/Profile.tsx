import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navigation from "../Components/NavBar";
import UserData from "../../models/User";
import Product from "../../models/Product";
import "../../assets/styles/UserProfile.css";
import { Tabs, Tab, Card, Badge } from "react-bootstrap";
import {
  fetchProducts,
  fetchProductsByProfile,
} from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Voucher from "../../models/Voucher";
import { fetchVouchers } from "../../services/Firebase/transactionService";

export default function Profile() {
  const navigate = useNavigate();
  const userDetails = useLocation().state as UserData;

  const [products, setProducts] = useState<Product[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length === 0 && vouchers.length === 0) {
      getProducts();
      getVouchers();
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
      console.log(voucherArray);
      setVouchers(voucherArray);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Loading />
          <Navigation />
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
                                  ₱{product.productPrice}
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
                    <div>
                      Hello There
                    </div>
                </Tab>

                <Tab eventKey="reviews" title="REVIEWS">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8">
                        <div className="media g-mb-30 media-comment">
                          <img
                            className="g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt=""
                          />
                          <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                            <div className="g-mb-15">
                              <h5 className="h5 g-color-gray-dark-v1 mb-0">
                                John Doe
                              </h5>
                              <span className="g-color-gray-dark-v4 g-font-size-12">
                                5 days ago
                              </span>
                            </div>

                            <p>
                              Cras sit amet nibh libero, in gravida nulla. Nulla
                              vel metus scelerisque ante sollicitudin. Cras
                              purus odio, vestibulum in vulputate at, tempus
                              viverra turpis. Fusce condimentum nunc ac nisi
                              vulputate fringilla. Donec lacinia congue felis in
                              faucibus ras purus odio, vestibulum in vulputate
                              at, tempus viverra turpis.
                            </p>

                            <ul className="list-inline d-sm-flex my-0">
                              <li className="list-inline-item g-mr-20">
                                <a
                                  className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                  href="#!"
                                >
                                  <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                                  178
                                </a>
                              </li>
                              <li className="list-inline-item g-mr-20">
                                <a
                                  className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                  href="#!"
                                >
                                  <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                                  34
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-8">
                        <div className="media g-mb-30 media-comment">
                          <img
                            className="g-width-50 g-height-50 rounded-circle g-mt-3 g-mr-15"
                            src="https://bootdey.com/img/Content/avatar/avatar1.png"
                            alt=""
                          />
                          <div className="media-body u-shadow-v18 g-bg-secondary g-pa-30">
                            <div className="g-mb-15">
                              <h5 className="h5 g-color-gray-dark-v1 mb-0">
                                John Doe
                              </h5>
                              <span className="g-color-gray-dark-v4 g-font-size-12">
                                5 days ago
                              </span>
                            </div>

                            <p>
                              Cras sit amet nibh libero, in gravida nulla. Nulla
                              vel metus scelerisque ante sollicitudin. Cras
                              purus odio, vestibulum in vulputate at, tempus
                              viverra turpis. Fusce condimentum nunc ac nisi
                              vulputate fringilla. Donec lacinia congue felis in
                              faucibus ras purus odio, vestibulum in vulputate
                              at, tempus viverra turpis.
                            </p>

                            <ul className="list-inline d-sm-flex my-0">
                              <li className="list-inline-item g-mr-20">
                                <a
                                  className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                  href="#!"
                                >
                                  <i className="fa fa-thumbs-up g-pos-rel g-top-1 g-mr-3"></i>
                                  178
                                </a>
                              </li>
                              <li className="list-inline-item g-mr-20">
                                <a
                                  className="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover"
                                  href="#!"
                                >
                                  <i className="fa fa-thumbs-down g-pos-rel g-top-1 g-mr-3"></i>
                                  34
                                </a>
                              </li>
                            </ul>
                          </div>
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
                                  {voucher.voucherValue} OFF
                                </h3>
                              </Card.Body>
                            </Card>
                          );
                        })}
                      </>
                    ) : (
                      <>You don't have any vouchers</>
                    )}
                  </div>
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
