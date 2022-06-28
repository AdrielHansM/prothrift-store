import React from "react";
import Footer from "../Components/Footer";
import '../../assets/styles/Shop.css';
import Navigation from "../Components/Navigation";

export default function Accessories() {
  return (
    <>
      <Navigation />
      <div>
        <h2 className='productCateg'>Accessories</h2>
      </div>
      <p style={{fontSize:'50px', textAlign:'center', marginBottom:'20%'}}>No Product Listed</p>
      <Footer />
    </>
  );
}
