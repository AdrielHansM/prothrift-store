import React, { useState, useEffect } from 'react'
import Product from '../../models/Product'
import Navigation from '../Components/Navigation'

const initialProducts = {
  productName: '',
  price: 0,
  descrtipion: ''
}

export default function Shop() {
  const [products, setProducts] = useState<Product>(initialProducts)

  useEffect(() => {
    const getProducts = () => {
      // Fetched Products
    }
  }, [])


  return (
    <>
    <Navigation/>
    <div>
      <h1>Shop</h1>
    </div>
    </>
  )
}