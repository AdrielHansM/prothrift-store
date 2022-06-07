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
              </div>
                <img src="/images/user.png" className="user-logo" alt=""/>
                <img src="/images/cart-logo.png" className="cart-logo" alt=""/>
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
    </>
  )
}
