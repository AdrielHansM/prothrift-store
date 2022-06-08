import React, { ChangeEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Profile.css';

export default function Profile() {
  const navigate = useNavigate();
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
          <img src="/images/ProThrift-Logo.png" className="brand-logo" alt="" onClick={() => navigate('/profilebody')}/>
            
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

          <li className="link" onClick={() => navigate('/profilebody')}>home</li>
          <li className="link" onClick={() => navigate('/shop-women')}>women</li>
          <li className="link" onClick={() => navigate('/shop-men')}>men</li>
          <li className="link" onClick={() => navigate('/shop-kids')}>kids</li>
          <li className="link" onClick={() => navigate('/shop-access')}>accessories</li>
          <div className="icon-space">
              <img src='/images/medals.png' className='medals-icon' alt=''/>
              <img src='/images/heart.png' className='heart-icon' alt=''/>
              <img src='/images/bell.png' className='bell-icon' alt=''/>
          </div>
      </ul>

    </>
  )
}
