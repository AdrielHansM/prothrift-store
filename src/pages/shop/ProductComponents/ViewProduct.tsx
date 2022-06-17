import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Product from "../../../models/Product";
import { fetchSingleProduct } from "../../../services/Firebase/firestoreService";
import Loading from "../../Components/LoadingScreen";
import Navigation from "../../Components/Navigation";
import UserData from "../../../models/User";

interface stateType {
  product: string;
  user: UserData;
}

export default function ViewProduct() {
  const state = useLocation().state as stateType;
  const [productDetails, setProductDetails] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state.product) {
      fetchData(state.product);
      console.log(state.user);
    }
  });

  async function fetchData(productId: string) {
    const fetchedProduct = await fetchSingleProduct(productId);
    if (fetchedProduct.productId) {
      setProductDetails(fetchedProduct);
      setLoading(false);
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
          <p>{productDetails?.productId}</p>
          <p>{productDetails?.productName}</p>
          <p>{productDetails?.productPrice}</p>
          <p>{productDetails?.productDescription}</p>
        </>
      )}
    </>
  );
}
