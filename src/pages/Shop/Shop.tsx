import '../../assets/styles/Profile.css';
import Navigation from '../Components/Navigation';
import { useNavigate } from 'react-router-dom';

export default function ProfileBody(){
    const navigate = useNavigate();

    return(
        <>
        <Navigation/>

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
            <h2 className="product-category1">Featured Products</h2>

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
            
            <footer className='site-footer'>
            <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify"><i>ProThrift.com</i> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><a href="">C</a></li>
              <li><a href="">UI Design</a></li>
              <li><a href="">PHP</a></li>
              <li><a href="">Java</a></li>
              <li><a href="">Android</a></li>
              <li><a href="">Templates</a></li>
            </ul>
          </div>
          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li onClick={() => navigate('/about')} style={{cursor: "pointer"}}>About Us</li>
              <li onClick={() => navigate('/contact')} style={{cursor: "pointer"}}>Contacts</li>
              <li onClick={() => navigate('/home')} style={{cursor: "pointer"}}>Privacy Policy</li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2022 All Rights Reserved by
         <a href="#"> ProThrift </a>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li><a className="facebook" href="#"><i className="fa-brands fa-facebook"></i></a></li>
              <li><a className="twitter" href="#"><i className="fa-brands fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
          </footer>
        </>
    )
}