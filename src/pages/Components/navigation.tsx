import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import '../../assets/styles/Navbar.css';
import {MenuItems} from "./MenuItems";
import { useNavigate } from 'react-router-dom';
import UserData from '../../models/User';


export default function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="NavbarItems">
        <div className="navbar-logo" onClick={() => navigate('/home')}>
          <img src="/images/ProThrift-Logo.png" className="brand-logo" alt=""/>
          <h3 className='logo-name'>ProThrift</h3>
        </div>
        <ul className={'nav-menu active'}>
          {MenuItems.map((item, index) => {
            
            return(
              <li key={index}>
                  <a className={item.cName} href={item.url}>
                  {item.title}
                  </a>
              </li>
            )
          })}
        </ul>
          
          <Button className='btnLogin' onClick={() => navigate('/login')}>Login</Button>
          <Button className='btnSign' onClick={() => navigate('/register')}>Signup</Button>
      </nav>
    
    </>  
  )
}
