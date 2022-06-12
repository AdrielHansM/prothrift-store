import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Profile.css';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">

          <div className='logo-brand' onClick={() => navigate('/home')}>
            <img src="/images/ProThrift-Logo.png" className="brand-logo" alt=""/>
            <h3 className='logo-name'>ProThrift</h3>
          </div>
            <div className="nav-items">
              <div className="search">
                <input type="text" className="search-box" placeholder="search brand, product"/>
                <button className="search-btn">search</button>
              </div>
                <img src="/images/user.png" className="user-logo" alt=""/>
                <img src="/images/cart.png" className="cart-logo" alt=""/>  
            </div> 
            <button className='sell-btn' onClick={() => navigate('/addproduct')}>sell</button>
        
      </nav>
      <ul className="links-container">
      
          <li className="link" onClick={() => navigate('/profilebody')}>home</li>
          <li className="link" onClick={() => navigate('/shop-women')}>women</li>
          <li className="link" onClick={() => navigate('/shop-men')}>men</li>
          <li className="link" onClick={() => navigate('/shop-kids')}>kids</li>
          <li className="link" onClick={() => navigate('/shop-access')}>accessories</li>
          <div className="icon-space">
              <img src='/images/medals.png' className='medals-icon' alt='' />
              <div onClick={() => navigate('/likedproducts')}> <i className="fas fa-heart" style={{height: "30px", width: "30px", cursor: "pointer"}} /> </div>
              <img src='/images/bell.png' className='bell-icon' alt=''/>
          </div>
      </ul>
      
    </>
  )
}
