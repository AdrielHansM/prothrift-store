import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import UserData from '../../models/User';
import { getUser } from '../../services/Firebase/firestoreService';
import { auth } from '../../services/Firebase/firebaseApp';

const initialUser = {
  userId: "",
  firstName: "",
  lastName: "",
  contactNumber: 0,
  email: "",
  isLogged: false,
  isDeleted: false,
  dateCreated: new Date(),
  dateUpdated: new Date()
}

export default function Profile() {
  const [userDetails, setUserDetails] = useState<UserData>(initialUser);

  useEffect(() => {
    fetchData();
  })
  
  async function fetchData() {
    const uidIsPresent = auth.currentUser?.uid;
    if (uidIsPresent && userDetails.isLogged === false) {
      const user = await getUser(uidIsPresent) as UserData;
      setUserDetails(user);
    }
  }

  return (
    <>
    <Navigation />
    <div>
      <h1>Users</h1>

      <p> 
      </p>
    </div>
    </>
  )
}
