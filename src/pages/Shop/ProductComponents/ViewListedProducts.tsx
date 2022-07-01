import { useEffect, useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "../../../models/Product";
import {fetchSingleProduct} from "../../../services/Firebase/productService";
import Navigation from "../../Components/Navigation";
import UserData from "../../../models/User";
import "../../../assets/styles/ViewProduct.css";
import {Form} from "react-bootstrap";

interface stateType {
  product: string;
  user: UserData;
}

export default function ViewListedProducts() {
  const state = useLocation().state as stateType;
  const [productDetails, setProductDetails] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (state.product) {
      fetchProductData(state.product);
      setLoading(false);
    }
  });

  async function fetchProductData(productId: string) {
    const fetchedProduct = await fetchSingleProduct(productId);
    if (fetchedProduct.productId) {
      setProductDetails(fetchedProduct);
    }
  }

  const handleSubmit = async (data: FormEvent<HTMLFormElement>) => {
    data.preventDefault();
  }
  return (
    <>
      {loading === true ? (
        <>
          <Navigation />
        </>
      ) : (
        <>
          <Navigation />
          <Form onSubmit={handleSubmit} className="sold-btn">
          <section className="details">
            <div className="product-con">
                <img
                    className="product-img"
                    src={productDetails?.imageUrl}
                    style={{ width: "40%", height: "auto" }}
                />
                <p>{productDetails?.isSold}</p>
              <div className="product-details">
                <p className="p-name">{productDetails?.productName}</p>
                <p className="price">₱{productDetails?.productPrice}</p>
                <p className="status">{productDetails?.status}</p>
                <p>meet-up place: {productDetails?.meetup}</p>
                <p>Description: <br/>
                    {productDetails?.productDescription}
                </p>
                <button type="submit" style={{marginLeft:'0'}}>Sold</button>
              </div>
            </div>
          </section>
          </Form>
          <br/>
        </>
      )}
    </>
  );
}
