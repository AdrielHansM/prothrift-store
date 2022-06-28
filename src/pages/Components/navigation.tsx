import { useState } from "react";
import { Button, Form, FormControl, NavDropdown, Toast, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/Navbar.css";
import UserData from "../../models/User";
import { auth } from "../../services/Firebase/firebaseApp";
import { getUser } from "../../services/Firebase/productService";
import { MenuItems } from "./MenuItems";

const initialUser = {
  userId: "",
  firstName: "",
  lastName: "",
  contactNumber: 0,
  email: "",
  isLogged: false,
  isDeleted: false,
  dateCreated: new Date(),
  dateUpdated: new Date(),
};

export default function Navigation() {
  const [userDetails, setUserDetails] = useState<UserData>(initialUser);
  const navigate = useNavigate();

  if (userDetails.isLogged === false) {
    fetchData();
  }

  async function fetchData() {
    const uidIsPresent = auth.currentUser?.uid;
    if (uidIsPresent && userDetails.isLogged === false) {
      const user = (await getUser(uidIsPresent)) as UserData;
      setUserDetails(user);
    }
  }

  async function handleLogout() {
    await auth.signOut();
    setUserDetails(initialUser);
    window.location.reload();
  }

  const navigateTo = (url: string) => {
    navigate(url, { state: userDetails });
  };

  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);

  const [showB, setShowB] = useState(false);
  const toggleShowB = () => setShowB(!showB);
  
  const [showNotify, setShowNotify] = useState(false);
  const toggleShowNotify = () => setShowNotify(!showNotify);

  function Example() {
    return (
      <Toast show={showA} onClose={toggleShowA} className="toast" delay={3000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">ProThrift</strong>
        </Toast.Header>
        <Toast.Body className="toast-body">
          Collect your daily points.
        </Toast.Body>
        <button className="toast-btn">Get!</button>
      </Toast>
    );
  }

  function Logout() {
    return (
      <Toast show={showB} onClose={toggleShowB} className="toast" delay={5000} autohide>
        <Toast.Body className="toast-body">
          Are you sure you want to logout?
        </Toast.Body>
        <button className="toast-btn" onClick={() => handleLogout()}>Confirm</button>
      </Toast>
    );
  }

  function Notify() {
    return (
      <Row>
        <Toast show={showNotify} onClose={toggleShowNotify} className="toast" delay={2000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
            <small>Just Now</small>
          </Toast.Header>
          <Toast.Body>Nothing to show!</Toast.Body>
        </Toast>
      </Row>
    );
  }

  return (
    <>
      <nav className="NavbarItems">
        <div className="navbar-logo" onClick={() => navigateTo("/home")}>
          <img src="/images/ProThrift-Logo.png" className="brand-logo" alt="" />
          <h3 className="logo-name">ProThrift</h3>
        </div>
        <ul className={"nav-menu active"}>
          <NavDropdown
            title={<span className="text-white" onClick={() => navigateTo("/shop")}>Shop</span>}
            id="nav-dropdown"
          >
            <NavDropdown.Item onClick={() => navigateTo("/shop-men")}>
              Men's
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigateTo("/shop-women")}>
              Women's
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigateTo("/shop-kids")}>
              Kid's
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => navigateTo("/shop-accessories")}>
              Accessories
            </NavDropdown.Item>
          </NavDropdown>

          {MenuItems.map((item, index) => {
            return (
              <li key={index} className="menu-items">
                <a className={item.cName}
                  onClick={() => {
                  navigateTo(item.url);
                  }}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
          <Form className="d-flex w-100">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="info">Search</Button>
          </Form>
        </ul>
        {userDetails.isLogged ? (
          <>
            <img src="/images/bell.png" className="bell-icon" alt="" onClick={() => setShowNotify(true)}/>

            <NavDropdown
              title={
                <img src="/images/user.png" className="user-logo" alt="" />
              }
            >
              <NavDropdown.Item onClick={() => navigateTo("/profile")}>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo("/chat")}>
                Messages
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => navigateTo("/likedproducts")}>
                Favorites
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  setShowA(true);
                }}
              >
                Points
              </NavDropdown.Item>
              <NavDropdown.Item 
                onClick={() => {
                setShowB(true);
                }}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            <button
              className="sell-btn"
              onClick={() => navigateTo("/addproduct")}
            >
              sell
            </button>
          </>
        ) : (
          <>
            <Button className="btnLogin" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button className="btnSign" onClick={() => navigate("/register")}>
              Signup
            </Button>
          </>
        )}
      </nav>
      <Notify/>
      <Logout/>
      <Example />
    </>
  );
}
