import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/Landingpage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className='landing-page'>
      <h1>Welcome to ProThrift</h1>
      <button onClick={() => navigate('/home')}>
        Begin
      </button>
    </div>
  )
}

export default LandingPage