import React, { ChangeEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getUser } from '../../services/Firebase/firestoreService';
import { getLoggedUser } from '../../services/Firebase/authService';
import '../../assets/styles/Profile.css';

export default function Profile() {
 /* const [loading, setLoading] = useState(false);
  var loggedUser = getLoggedUser(); 
  setLoading(true);
  setTimeout("", 4000)
  setLoading(false);
  var userDetails: any[] = []
  userDetails.push(getUser(loggedUser ? loggedUser.uid : ''));
  

  console.log(userDetails)*/
  return (
    <>
      <nav className="navbar">
        <div className="nav">
          <img src="/images/ProThrift-Logo.png" className="brand-logo" alt=""/>
            <div className="nav-items">
              <div className="search">
                <input type="text" className="search-box" placeholder="search brand, product"/>
                <button className="search-btn">search</button>
              
                <img src="/images/user.png" className="user-logo" alt=""/>
                <img src="/images/cart-logo.png" className="cart-logo" alt=""/>
              </div>
            </div> 
        </div>
      </nav>

      <ul className="links-container">
        <li className="link-item"><a href="#" className="link">home</a></li>
        <li className="link-item"><a href="#" className="link">women</a></li>
        <li className="link-item"><a href="#" className="link">men</a></li>
        <li className="link-item"><a href="#" className="link">kids</a></li>
        <li className="link-item"><a href="#" className="link">accessories</a></li>
      </ul>

      <div className="hero-section" style={{ backgroundImage: "url(/images/header.png)" }}>
        <div className="content">
          <img src="/images/ProThrift-logo.png" className="logo" alt=""/>
          <p className="sub-heading">Best fashion collection of all time</p>
        </div>
      </div>

      <section className="product">
        <h2 className="product-category">best selling</h2>

        <div className="product-container">
          <div className="product-card">
            <div className="product-image">
                <span className="discount-tag">50% off</span>
                <img src="/images/card1.png" className="product-thumb" alt=""/>
                <button className="card-btn">add to whislist</button>
            </div>
              <div className="product-info">
                  <h2 className="product-brand">brand</h2>
                  <p className="product-short-des">a short line about the cloth..</p>
                  <span className="price">$20</span><span className="actual-price">$40</span>
              </div>
          </div>
        </div>
      </section>
    </>
  )
}
