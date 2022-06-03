import React, { ChangeEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import { getUser } from '../../services/Firebase/firestoreService';
import { getLoggedUser } from '../../services/Firebase/authService';


export default function Contact() {
 /* const [loading, setLoading] = useState(false);
  var loggedUser = getLoggedUser(); 
  setLoading(true);
  setTimeout("", 4000)
  setLoading(false);
  var userDetails: any[] = []
  userDetails.push(getUser(loggedUser ? loggedUser.uid : ''));
  

  console.log(userDetails)*/
  return (
    <>
    <Navigation />
    <div>
      <h1>Contact Us</h1>
      <p>
         
      </p>
    </div>
    </>
  )
}
