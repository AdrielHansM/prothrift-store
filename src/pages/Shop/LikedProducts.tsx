import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/styles/Profile.css";
import Product from "../../models/Product";
import UserData from "../../models/User";
import { fetchUserFavorites } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/NavBar";

export default function LikedProducts() {
  const userDetails = useLocation().state as UserData;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const loadTimer = setTimeout(() => setLoading(false), 3000);

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const productArray = (await fetchUserFavorites(
      userDetails.userId
    )) as Product[];
    if (productArray) {
      console.log(productArray);
      setProducts(productArray);
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
          <section>
            <h2 className="product-category2">Favorites</h2>
            <div className="product-container2" style={{ marginBottom: "17%" }}>
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
                          <span className="price">???{product.productPrice}</span>
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
