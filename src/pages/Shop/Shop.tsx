import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Profile.css";
import Product from "../../models/Product";
import UserData from "../../models/User";
import { fetchProducts } from "../../services/Firebase/firestoreService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/Navigation";

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
              <img src="/images/ProThrift-logo.png" className="logo" alt="" />
              <p className="sub-heading">Best fashion collection of all time</p>
            </div>
          </div>
          <br />

          <section className="message-to-user">
            <div>
              <h2>Our users are superheroes!</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </section>

          <section>
            <h2 className="product-category2">Products</h2>
            <div className="product-container2 col-3">
              {products.map((product, index) => {
                return (
                  <>
                    <Link
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
                          <span className="price">{product.productPrice}</span>
                          <div>
                            <img
                              src="/images/heart1.png"
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
          <Footer />
        </>
      )}
    </>
  );
}
