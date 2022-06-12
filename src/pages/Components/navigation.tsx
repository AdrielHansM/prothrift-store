import { useState } from 'react'
import { Button, NavDropdown } from 'react-bootstrap'
import '../../assets/styles/Navbar.css';
import {MenuItems} from "./MenuItems";
import { useNavigate } from 'react-router-dom';
import UserData from '../../models/User';
import { auth } from '../../services/Firebase/firebaseApp';
import { getUser } from '../../services/Firebase/firestoreService';

const initialUser = {
  userId: "",
  firstName: "",
  lastName: "",
  contactNumber: 0,
  email: "",
  isLogged: false,
  isDeleted: false,
  dateCreated: new Date(),
  dateUpdated: new Date()
}

export default function Navigation() {
  const [userDetails, setUserDetails] = useState<UserData>(initialUser);
  const navigate = useNavigate();

  if (userDetails.isLogged === false) {
    fetchData(); 
  }
    
  async function fetchData() {
    const uidIsPresent = auth.currentUser?.uid;
    if (uidIsPresent && userDetails.isLogged === false) {
      const user = await getUser(uidIsPresent) as UserData;
      setUserDetails(user);
    }
  }

  async function handleLogout() {
    await auth.signOut();
    setUserDetails(initialUser);
    window.location.reload();
  }

  const navigateTo = (url : string) => {
    navigate(url, { state: userDetails});
  }

  return (
    <>
      <nav className="NavbarItems">
        <div className="navbar-logo" onClick={() => navigateTo('/home')}>
          <img src="/images/ProThrift-Logo.png" className="brand-logo" alt=""/>
          <h3 className='logo-name'>ProThrift</h3>
        </div>
        <ul className={'nav-menu active'}>
            
            <NavDropdown title={<span className='text-white'>ProThrift</span>} id="nav-dropdown">
              <NavDropdown.Item onClick={() => navigateTo('/shop')}>Shop</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigateTo('/shop-women')}>Womens</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo('/shop-men')}>Mens</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo('/shop-kids')}>Kids</NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo('/shop-accessories')}>Accessories</NavDropdown.Item>
            </NavDropdown>
            
          {MenuItems.map((item, index) => {
            return(
              <li key={index} className="menu-items">
                  <a className={item.cName} onClick={() => {navigateTo(item.url)}}>
                  {item.title}
                  </a>
              </li>
            )
          })}
          <div className="search">
                <input type="text" className="search-box" placeholder="search brand, product"/>
                <button className="search-btn">search</button>
            </div>
        </ul>
        
        {
        userDetails.isLogged 
        ? <>
              <img src='/images/bell.png' className='bell-icon' alt=''/>
            
            <NavDropdown title={
              <img src="/images/user.png" className="user-logo" alt=""/>}>
              <NavDropdown.Item onClick={() => navigateTo('/profile')}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo('/profile')}>
                Messages
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo('/profile')}>
                Favorites
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo('/profile')}>
                Points
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleLogout()}>
                logout
              </NavDropdown.Item>
            </NavDropdown>
          </>
        : <> 
            <Button className='btnLogin' onClick={() => navigate('/login')}>Login</Button>
            <Button className='btnSign' onClick={() => navigate('/register')}>Signup</Button>
          </>
        }

      </nav>
    </>  
  )
}
