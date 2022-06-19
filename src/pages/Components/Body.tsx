import Navigation from './Navigation';
import '../../assets/styles/Body.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import UserData from '../../models/User';

export default function Body() {
    
    const state = useLocation().state as UserData;
    console.log(state)

    const navigate = useNavigate();

    return(
        <>
        <Navigation/>

        <div className="background" style={{ backgroundImage: "url(/images/header.png)" }}>
            <div>
                <img src="/images/ProThrift-logo.png" className="logo" alt=""/>
                <p className='bcktext'>Sustainability is the Key </p>
            </div>
        </div>
        <br/>
            <div className="text1Con">
                <p className="text1">Total of Users saved a Potential</p>
                    <div className="numofpounds">
                        <p>### Pounds</p>
                    </div>
                <p className="text1">By Doing Secondhand Shopping</p>
            </div>
            <br/>

            <div className="text2">
                <h1 className="textTitle">What We Do!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <br/>

            <div className="testimonials">
                <p>Testimonials</p>
                <h3>People love this!</h3>
                <div className="testimony">
                    <span>"This platform is so cool and create so much value"</span>
                    <span>"This platform is so cool and create so much value"</span>
                    <span>"This platform is so cool and create so much value"</span>
                </div>
            </div>
            <br/>
        <div className="feedback">
            <h1 className="fdback">Feedback!</h1>
            <Link to={'/feedback'}><Button className="fdBtn">Click here</Button></Link>
        </div>
        <br/><br/>
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
            <li onClick={() => navigate('')} style={{cursor: "pointer"}}>Men</li>
            <li onClick={() => navigate('')} style={{cursor: "pointer"}}>Women</li>
            <li onClick={() => navigate('')} style={{cursor: "pointer"}}>Kids</li>
            <li onClick={() => navigate('')} style={{cursor: "pointer"}}>Accessories</li>
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
              <li><a className="facebook" href="https://www.facebook.com/"><i className="fa-brands fa-facebook"></i></a></li>
              <li><a className="instagram" href="https://www.instagram.com/"><i className="fa-brands fa-instagram"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
          </footer>
        </>
    )
}