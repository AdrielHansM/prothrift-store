import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import '../../assets/styles/Navbar.css';


export default function Navigation() {
  return (
    <>
    <nav className="NavbarItems">
      <h1 className="navbar-logo">ProThrift<i className='fab fa-react'></i></h1>
          <div className="menu-icon">
              <i className={'fas fa-times'}></i>
          </div>
          <ul className={'nav-menu active'}>
          <li>
          <Link to={'/shop'} >Shop</Link>
          </li>
          <li>
          <Link to={'/about'} >About</Link>
          </li>
          <li>
          <Link to={'/chat'} > Chats</Link>
          </li>
          <li>
          <Link to={'/profile'} > Profile</Link>
          </li>
          </ul>
          <Button>
            <Link to={'/Login'} >Login</Link>
          </Button>
          <Button>
            <Link to={'/Register'} >Signup</Link>
          </Button>
    </nav>
    </>
    
  )
}