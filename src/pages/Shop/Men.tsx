import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Profile.css";
import Product from "../../models/Product";
import UserData from "../../models/User";
import { fetchProducts } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/Navigation";
import { Button } from "react-bootstrap";

export default function Men() {
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

          <section>
            <h2 className="product-category2">Men's Clothes</h2>
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
          <Footer />
        </>
      )}
    </>
  );
}
