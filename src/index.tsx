import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Components from './pages/Components/Navigation';
import Login from './pages/Login/Login';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/User/Profile';
import Shop from './pages/shop/Shop';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Chat from './pages/Chat/Chat';
import Navigation from './pages/Components/Navigation';
import Contact from './pages/Contact/Contact';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} >
          <Route index element={<LandingPage />} />
          <Route path={'nav'} element={<Navigation />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
          <Route path={'shop'} element={<Shop />} />
          <Route path={'about'} element={<About />} />
          <Route path={'chat'} element={<Chat />} />
          <Route path={'profile'} element={<Profile />} />
          <Route path={'contact'} element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

