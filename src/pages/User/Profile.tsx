import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import UserData from '../../models/User';

export default function Profile() {
  const state = useLocation().state as UserData;
  console.log(state)

  return (
    <>
    <Navigation />
    <div>
      <h1>Users</h1>

      <p> 
        {state?.userId}
      </p>
    </div>
    </>
  )
}
