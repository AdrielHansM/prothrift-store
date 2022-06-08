import React from 'react'
import '../../assets/styles/Profile.css';
import { useNavigate } from 'react-router-dom';
import ProfileNav from './ProfileNav';

export default function ProfileBody(){
    const navigate = useNavigate();

    return(
        <>
        <ProfileNav/>

            <div className="hero-section" style={{ backgroundImage: "url(/images/header.png)" }}>
                <div className="content">
                    <img src="/images/ProThrift-logo.png" className="logo" alt=""/>
                    <p className="sub-heading">Best fashion collection of all time</p>
                </div>
            </div>
            <br/>

            <section>
                <div>
                    <h2>This is if possible to make the daily login points to collect</h2>
                </div>
            </section>

            <section className="product">
            <h2 className="product-category">best selling</h2>

            <button className="pre-btn"><img src="/images/arrow.png" alt=""/></button>
            <button className="nxt-btn"><img src="/images/arrow.png" alt=""/></button>

            <div className="product-container">
            <div className="product-card">
                <div className="product-image">
                    <img src="/images/card1.jpg" className="product-thumb" alt=""/>
                    <button className="card-btn">add to whislist</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">shorts</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card2.jpg" className="product-thumb" alt=""/>
                    <button className="card-btn">add to whislist</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">jacket</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card5.png" className="product-thumb" alt=""/>
                    <button className="card-btn">add to whislist</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">brand</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card11.png" className="product-thumb" alt=""/>
                    <button className="card-btn">add to whislist</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">shoe brand</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                    <button className="card-btn">add to whislist</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">air jordan</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                </div>
            </div>
            </div>
            </section>
            <br/><hr/>
            <footer>
                <h1>This is Footer</h1>
            </footer>
        </>
    )
}