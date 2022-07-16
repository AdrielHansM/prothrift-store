import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../assets/styles/Profile.css";
import Product from "../../models/Product";
import UserData from "../../models/User";
import { searchProduct } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";
import Navigation from "../Components/NavBar";

interface stateType {
  searchKey: string;
  user: UserData;
}

export default function SearchProduct() {
  const state = useLocation().state as stateType;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProducts();
  }, [state.searchKey]);

  const getProducts = async () => {
    setLoading(true);
    const productArray = await searchProduct(
      state.searchKey,
      state.user.userId
    );
    if (productArray) {
      setProducts(productArray);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navigation />

          <section>
            <h1 className="m-lg-5">
              Search key containing "{state.searchKey}"
            </h1>
            <div className="product-container2">
              {products.map((product, index) => {
                return (
                  <>
                    <Link
                      className="product-link"
                      to={"/view-product"}
                      state={{ user: state.user, product: product.productId }}
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
