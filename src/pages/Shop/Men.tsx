import React, { useState, useEffect } from 'react'
import Product from '../../models/Product'
import { useLocation } from 'react-router-dom';
import Navigation from '../Components/Navigation';

export default function Men() {


  return (
    <>
    <Navigation/>
    <div>
      <h1>Men</h1>
    </div>
    </>
  )
}