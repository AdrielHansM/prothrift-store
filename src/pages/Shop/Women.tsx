import React, { useState, useEffect } from 'react'
import Product from '../../models/Product'
import ProfileNav from '../User/ProfileNav'
import '../../assets/styles/Shop.css';

/*const initialProducts = {
  productName: '',
  price: 0,
  descrtipion: ''
}*/

export default function Women() {
/*  const [products, setProducts] = useState<Product>(initialProducts)

  useEffect(() => {
    const getProducts = () => {
      // Fetched Products
    }
  }, [])*/


  return (
    <>
    <ProfileNav/>
    <div>
      <h1 className='titleWomen'>Women's Clothes</h1>
    </div>

    <div className="product-container1">
      <div className="product-card">
          <div className="product-image">
              <img src="/images/card4.png" className="product-thumb" alt=""/>
              <button className="card-btn">add to cart</button>
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
              <button className="card-btn">add to cart</button>
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
              <button className="card-btn">add to cart</button>
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
              <button className="card-btn">add to cart</button>
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
              <button className="card-btn">add to cart</button>
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
              <button className="card-btn">add to cart</button>
          </div>
          <div className="product-info">
              <h2 className="product-brand">shorts</h2>
              <p className="product-short-des">a short line about the cloth..</p>
              <span className="price">$20</span><span className="actual-price">$40</span>
          </div>
      </div>                    
    </div>

    <br/>
    <footer className='footer'>
        <h1>This is Footer</h1>
    </footer>
    </>
  )
}