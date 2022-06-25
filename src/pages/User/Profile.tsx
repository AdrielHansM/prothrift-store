import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navigation from "../Components/Navigation";
import UserData from "../../models/User";
import Product from "../../models/Product";
import "../../assets/styles/UserProfile.css";
import { Tabs, Tab } from "react-bootstrap";
import { fetchProducts } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";


export default function Profile() {
  const navigate = useNavigate();
  const userDetails = useLocation().state as UserData;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const state = useLocation().state as UserData;
  console.log(state);

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
      <Navigation />

      <div className="container">
        <div className="row">
            <div id="content" className="content content-full-width">
              <div className="profile-header">
                <div className="profile-header-cover"></div>

                <div className="profile-header-content">
                  <div className="profile-header-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt=""
                    />
                  </div>

                  <div className="profile-header-info">
                    <h4>{`${state?.firstName} ${state?.lastName}`}</h4>
                    <button
                      className="edit-btn"
                      onClick={() => navigate("/editprofile", { state: state })}
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
                      to={"#"}
                      state={{ user: userDetails, product: product.productId }}
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
            </Tab>

            <Tab eventKey="monthly" title="REVIEWS">
              <div>Your Reviews</div>
            </Tab>
            
          </Tabs>

        </div>
      </div>
      <Footer />
    </>
  );
}
