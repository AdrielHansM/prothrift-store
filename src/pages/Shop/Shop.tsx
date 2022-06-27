import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Profile.css";
import Product from "../../models/Product";
import UserData from "../../models/User";
import { fetchProducts } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/Navigation";
import { Pagination, Col, Container, Row } from "react-bootstrap";

export default function ProfileBody() {
  const userDetails = useLocation().state as UserData;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const productArray = await fetchProducts();
    if (productArray) {
      setProducts(productArray);
      setLoading(false);
    }
  };

  const navigateToProduct = (productId: string) => {
    console.log(userDetails);
    console.log(productId);
    navigate("/view-product", {
      state: { user: userDetails, productId: productId },
    });
  };

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

        <Container>
          <Row>
            <Col>
              <div className='coupon_box'>
                <div className='coupon-body'>
                  <h2 className='how_much'> <b> 5% </b> </h2>
                  <h3> OFF </h3>
                </div>
                <button className='redeem-btn'> Redeem </button>
              </div>
            </Col>
            <Col>
              <div className='coupon_box2'>
                <div className='coupon-body2'>
                  <h2 className='how_much'> <b> 15% </b> </h2>
                  <h3> OFF </h3>
                </div>
                <button className='redeem-btn'> Redeem </button>
              </div>
            </Col>
            <Col>
              <div className='coupon_box3'>
                <div className='coupon-body3'>
                  <h2 className='how_much'> <b> 25% </b> </h2>
                  <h3> OFF </h3>
                </div>
                <button className='redeem-btn'> Redeem </button>
              </div>
            </Col>
          </Row>
        </Container>

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
            <Pagination className="paginate">
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Ellipsis />
              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}
