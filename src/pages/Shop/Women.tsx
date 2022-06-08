import React, { useState, useEffect } from 'react'
import Product from '../../models/Product'
import ProfileNav from '../User/ProfileNav';

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
      <h1>Women</h1>
    </div>
    </>
  )
}