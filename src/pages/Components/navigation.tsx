import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import '../../assets/styles/Navbar.css';
import {MenuItems} from "./MenuItems";
import { useNavigate } from 'react-router-dom';


export default function Navigation() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="NavbarItems">
        <h1 className="navbar-logo" onClick={() => navigate('/home')}>ProThrift<i className='fab fa-react'></i></h1>
          <div className="menu-icon">
            <i className={'fas fa-times'}></i>
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
