import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import LandingPage from "./pages/LandingPage/LandingPage";
import Women from "./pages/Shop/Women";
import Men from "./pages/Shop/Men";
import Kids from "./pages/Shop/Kids";
import Accessories from "./pages/Shop/Accessories";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import Chat from "./pages/Chat/Chat";
import Contact from "./pages/Contact/Contact";
import Body from "./pages/Home/Body";
import Feedback from "./pages/Feedback/Feedback";
import FirstFeat from "./pages/Components/FirstFeat";
import SecFeat from "./pages/Components/SecFeat";
import ProfileBody from "./pages/Shop/Shop";
import LikedProducts from "./pages/Shop/LikedProducts";
import AddProductForm from "./pages/Shop/ProductComponents/AddProductForm";
import Profile from "./pages/User/Profile";
import ViewProduct from "./pages/Shop/ProductComponents/ViewProduct";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />}>
          <Route index element={<LandingPage />} />
          <Route path={"home"} element={<Body />} />
          <Route path={"profile"} element={<Profile />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"register"} element={<Register />} />
          <Route path={"firstfeat"} element={<FirstFeat />} />
          <Route path={"secfeat"} element={<SecFeat />} />
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
          <Route path={"likedproducts"} element={<LikedProducts />} />
          <Route path={"addproduct"} element={<AddProductForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
