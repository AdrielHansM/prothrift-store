import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../models/Product";
import {
  fetchSingleProduct,
  getUser,
} from "../../../services/Firebase/productService";
import Loading from "../../Components/LoadingScreen";
import Navigation from "../../Components/Navigation";
import UserData from "../../../models/User";
import "../../../assets/styles/ViewProduct.css";

interface stateType {
  product: string;
  user: UserData;
}

export default function ViewProduct() {
  const state = useLocation().state as stateType;
  const [productDetails, setProductDetails] = useState<Product>();
  const [sellerDetails, setSellerDetails] = useState<UserData>();
  const [loading, setLoading] = useState(true);

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
                  <p>Reviews?</p>
                </div>
                <div className="product-btn">
                  <button>Message Seller</button>
                  <button>Buy</button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
