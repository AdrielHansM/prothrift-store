import React from 'react';
import ReactDOM from 'react-dom/client';
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import LandingPage from './pages/LandingPage/LandingPage';
import ProfileScreen from './pages/User/Profile';
import Shop from './pages/shop/Shop';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />} >
          <Route index element={<LandingPage />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Login register />} />
          <Route path={'profile'} element={<ProfileScreen />} />
          <Route path={'shop'} element={<Shop />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

