import React from 'react'
import '../../assets/styles/Shop.css';
import Navigation from '../Components/Navigation';
import Footer from "../Components/Footer";


export default function Women() {

  return (
    <>
    <Navigation/>
    <div>
      <h2 className='productCateg'>Women's Clothes</h2>
    </div>

    <div className="product-container1">
      <div className="product-card">
          <div className="product-image">
              <img src="/images/card4.png" className="product-thumb" alt=""/>
              <button className="card-btn">Buy Product</button>
          </div>
          <div className="product-info">
              <h2 className="product-brand">shorts</h2>
              <p className="product-short-des">a short line about the cloth..</p>
              <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
      </div>
      <div className="product-card">
          <div className="product-image">
              <img src="/images/card4.png" className="product-thumb" alt=""/>
              <button className="card-btn">Buy Product</button>
          </div>
          <div className="product-info">
              <h2 className="product-brand">shorts</h2>
              <p className="product-short-des">a short line about the cloth..</p>
              <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
      </div>   
      <div className="product-card">
          <div className="product-image">
              <img src="/images/card4.png" className="product-thumb" alt=""/>
              <button className="card-btn">Buy Product</button>
          </div>
          <div className="product-info">
              <h2 className="product-brand">shorts</h2>
              <p className="product-short-des">a short line about the cloth..</p>
              <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
      </div>                      
    </div>
    <div className="product-container1">
      <div className="product-card">
          <div className="product-image">
              <img src="/images/card1.jpg" className="product-thumb" alt=""/>
              <button className="card-btn">Buy Product</button>
          </div>
          <div className="product-info">
              <h2 className="product-brand">shorts</h2>
              <p className="product-short-des">a short line about the cloth..</p>
              <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
      </div>
      <div className="product-card">
          <div className="product-image">
              <img src="/images/card1.jpg" className="product-thumb" alt=""/>
              <button className="card-btn">Buy Product</button>
          </div>
          <div className="product-info">
              <h2 className="product-brand">shorts</h2>
              <p className="product-short-des">a short line about the cloth..</p>
              <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
      </div>   
      <div className="product-card">
          <div className="product-image">
              <img src="/images/card1.jpg" className="product-thumb" alt=""/>
              <button className="card-btn">Buy Product</button>
          </div>
          <div className="product-info">
              <h2 className="product-brand">shorts</h2>
              <p className="product-short-des">a short line about the cloth..</p>
              <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
      </div>                    
    </div>

    <Footer />
    </>
  )
}