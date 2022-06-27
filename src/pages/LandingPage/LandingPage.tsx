import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Landingpage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className='landing-page'>
      <div>
        <img src="/images/ProThrift-logo.png" className="logo" alt="" />
      </div>
      <button onClick={() => navigate('/home')}>
        Begin
      </button>
    </div>
  )
}

export default LandingPage