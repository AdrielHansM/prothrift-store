import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../models/Product";
import {
  fetchSingleProduct,
  getUser,
} from "../../../services/Firebase/firestoreService";
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
          <p>{productDetails?.productId}</p>
          <p>Image Here</p>
          <p>{productDetails?.productName}</p>
          <p>{productDetails?.productPrice}</p>
          <p>{productDetails?.meetup}</p>
          <p>{productDetails?.productDescription}</p>
          <button>Buy</button>
          <br/>
          
          <h3>seller</h3>
          <p>{sellerDetails?.firstName}</p>
          <p>{sellerDetails?.lastName}</p>
          <p>{sellerDetails?.contactNumber}</p>
          <p>{sellerDetails?.email}</p>
          <p>Reviews?</p>
          <button>Message Seller??</button>
          </section>
        </>
      )}
    </>
  );
}
