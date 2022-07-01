import "../../assets/styles/Shop.css";
import Navigation from "../Components/Navigation";
export default function LikedProducts() {
  return (
    <>
      <Navigation />
      <div>
        <h1 className="titleWomen">Liked Products</h1>
      </div>

      <div className="product-container1">
        <div className="product-card">
          <div className="product-image">
            <img src="/images/card1.jpg" className="product-thumb" alt="" />
            <button className="card-btn">add to cart</button>
          </div>
          <div className="product-info">
            <h2 className="product-brand">shorts</h2>
            <p className="product-short-des">a short line about the cloth..</p>
            <span className="price">$20</span>
            <span className="actual-price">$40</span>
            <div>
              <img src="/images/heart.png" className="liked-heart" alt="" />
            </div>
          </div>
        </div>
        <div className="product-card">
          <div className="product-image">
            <img src="/images/card12.jpg" className="product-thumb" alt="" />
            <button className="card-btn">add to cart</button>
          </div>
          <div className="product-info">
            <h2 className="product-brand">shorts</h2>
            <p className="product-short-des">a short line about the cloth..</p>
            <span className="price">$20</span>
            <span className="actual-price">$40</span>
            <div>
              <img src="/images/heart.png" className="liked-heart" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
