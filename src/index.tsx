import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './pages/Login/Login';
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/User/Profile';
import Shop from './pages/shop/Shop';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Chat from './pages/Chat/Chat';
import Contact from './pages/Contact/Contact';
import Body from './pages/Components/Body';
import Feedback from './pages/Feedback/Feedback';
import FirstFeat from './pages/Components/FirstFeat';
import SecFeat from './pages/Components/SecFeat';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} >
          <Route index element={<LandingPage />} />
          <Route path={'home'} element={<Body />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
          <Route path={'firstfeat'} element={<FirstFeat />} />
          <Route path={'secfeat'} element={<SecFeat />} />
          <Route path={'shop'} element={<Shop />} />
          <Route path={'about'} element={<About />} />
          <Route path={'chat'} element={<Chat />} />
          <Route path={'profile'} element={<Profile />} />
          <Route path={'contact'} element={<Contact />} />
          <Route path={'feedback'} element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

