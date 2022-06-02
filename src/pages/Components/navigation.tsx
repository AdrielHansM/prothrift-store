import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Product from '../../models/Product'

export default function Navigation() {
  return (
    <div>
      <h1>Navigation</h1>
      <p>
        <Link to={'/shop'} >Shop</Link>
      </p>
      <p>
        <Link to={'/about'} >About</Link>
      </p>
      <p>
        <Link to={'/chat'} > Chats</Link>
      </p>
      <p>
        <Link to={'/profile'} > Profile</Link>
      </p>
    </div>
  )
}