import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

import About from "./pages/About/About";
import Chat from "./pages/Chat/Chat";
import Contact from "./pages/Contact/Contact";
import Feedback from "./pages/Feedback/Feedback";
import Home from "./pages/Home/Home";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Accessories from "./pages/Shop/Accessories";
import Kids from "./pages/Shop/Kids";
import LikedProducts from "./pages/Shop/LikedProducts";
import Men from "./pages/Shop/Men";
import AddProductForm from "./pages/Shop/ProductComponents/AddProductForm";
import ViewProduct from "./pages/Shop/ProductComponents/ViewProduct";
import ProfileBody from "./pages/Shop/Shop";
import Women from "./pages/Shop/Women";
import Profile from "./pages/User/Profile";
import EditProfile from "./pages/User/UserComponenents/EditProfile";
import ViewListedProducts from "./pages/Shop/ProductComponents/ViewListedProducts";
import EditListedProduct from "./pages/Shop/ProductComponents/EditListedProduct";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path={"home"} element={<Home />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />
          <Route path={"about"} element={<About />} />
          <Route path={"chat"} element={<Chat />} />
          <Route path={"shop"} element={<ProfileBody />} />
          <Route path={"contact"} element={<Contact />} />
          <Route path={"feedback"} element={<Feedback />} />
          <Route path={"shop-women"} element={<Women />} />
          <Route path={"shop-men"} element={<Men />} />
          <Route path={"shop-kids"} element={<Kids />} />
          <Route path={"shop-accessories"} element={<Accessories />} />
          <Route path={"view-product"} element={<ViewProduct />} />
          <Route path={"viewlisted-products"} element={<ViewListedProducts />} />
          <Route path={"likedproducts"} element={<LikedProducts />} />
          <Route path={"addproduct"} element={<AddProductForm />} />
          <Route path={"editprofile"} element={<EditProfile />} />
          <Route path={"editlistedproduct"} element={<EditListedProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
