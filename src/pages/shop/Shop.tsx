import React, { useState, useEffect } from 'react'
import Product from '../../models/Product'


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
    <div>
      <h1>Shop</h1>

      <div className='products'>
      <p>
        { products.productName }
      </p>
      <p>
        { products.price }
      </p>
      <p>
        { products.descrtipion }
      </p>
      </div>
    </div>
  )
}