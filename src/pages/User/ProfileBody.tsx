import React from 'react'
import { ToggleButton } from 'react-bootstrap';
import { ButtonToggle } from 'reactstrap';
import '../../assets/styles/Profile.css';
import ProfileNav from './ProfileNav';

export default function ProfileBody(){

<script>
    
</script>

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

            <section className='message-to-user'>
                <div>
                    <h2>Our users are superheroes!</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
            </section>

            <section className="product">
            <h2 className="product-category1">best selling</h2>

            <button className="pre-btn"><img src="/images/arrow.png" alt=""/></button>
            <button className="nxt-btn"><img src="/images/arrow.png" alt=""/></button>

            <div className="product-container">
            <div className="product-card">
                <div className="product-image">
                    <img src="/images/card1.jpg" className="product-thumb" alt=""/>
                    <button className="card-btn">add to cart</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">shorts</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                        <div>
                           <i className="fas fa-heart fa-2x"></i>
                        </div>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card2.jpg" className="product-thumb" alt=""/>
                    <button className="card-btn">add to cart</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">jacket</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                    <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card5.png" className="product-thumb" alt=""/>
                    <button className="card-btn">add to cart</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">brand</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                    <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card11.png" className="product-thumb" alt=""/>
                    <button className="card-btn">add to cart</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">shoe brand</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                    <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                </div>
            </div>
            <div className="product-card">
                <div className="product-image">
                    <span className="discount-tag">50% off</span>
                    <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                    <button className="card-btn">add to cart</button>
                </div>
                <div className="product-info">
                    <h2 className="product-brand">air jordan</h2>
                    <p className="product-short-des">a short line about the cloth..</p>
                    <span className="price">$20</span><span className="actual-price">$40</span>
                    <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                </div>
            </div>
            </div>
            </section>
            <section>
                <h2 className="product-category2">Products</h2>
                    <div className="product-container2">
                        <div className="product-card">
                            <div className="product-image">
                                <span className="discount-tag">50% off</span>
                                <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                                <button className="card-btn">add to cart</button>
                            </div>
                            <div className="product-info">
                                <h2 className="product-brand">air jordan</h2>
                                <p className="product-short-des">a short line about the cloth..</p>
                                <span className="price">$20</span><span className="actual-price">$40</span>
                                <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-image">
                                <span className="discount-tag">50% off</span>
                                <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                                <button className="card-btn">add to cart</button>
                            </div>
                            <div className="product-info">
                                <h2 className="product-brand">air jordan</h2>
                                <p className="product-short-des">a short line about the cloth..</p>
                                <span className="price">$20</span><span className="actual-price">$40</span>
                                <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-image">
                                <span className="discount-tag">50% off</span>
                                <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                                <button className="card-btn">add to cart</button>
                            </div>
                            <div className="product-info">
                                <h2 className="product-brand">air jordan</h2>
                                <p className="product-short-des">a short line about the cloth..</p>
                                <span className="price">$20</span><span className="actual-price">$40</span>
                                <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="product-container3">
                        <div className="product-card">
                            <div className="product-image">
                                <span className="discount-tag">50% off</span>
                                <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                                <button className="card-btn">add to cart</button>
                            </div>
                            <div className="product-info">
                                <h2 className="product-brand">air jordan</h2>
                                <p className="product-short-des">a short line about the cloth..</p>
                                <span className="price">$20</span><span className="actual-price">$40</span>
                                <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-image">
                                <span className="discount-tag">50% off</span>
                                <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                                <button className="card-btn">add to cart</button>
                            </div>
                            <div className="product-info">
                                <h2 className="product-brand">air jordan</h2>
                                <p className="product-short-des">a short line about the cloth..</p>
                                <span className="price">$20</span><span className="actual-price">$40</span>
                                <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                            </div>
                        </div>
                        <div className="product-card">
                            <div className="product-image">
                                <span className="discount-tag">50% off</span>
                                <img src="/images/card12.jpg" className="product-thumb" alt=""/>
                                <button className="card-btn">add to cart</button>
                            </div>
                            <div className="product-info">
                                <h2 className="product-brand">air jordan</h2>
                                <p className="product-short-des">a short line about the cloth..</p>
                                <span className="price">$20</span><span className="actual-price">$40</span>
                                <div><img src="/images/heart1.png" className="liked-heart" alt=''/></div>
                            </div>
                        </div>
                    </div>
            </section>
            
            <br/>
            <footer className='footer'>
                <h1>This is Footer</h1>
            </footer>
        </>
    )
}