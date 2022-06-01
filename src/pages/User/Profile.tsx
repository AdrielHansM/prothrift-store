import React, { ChangeEvent, useState, useEffect } from 'react'
import { UserInfo } from 'firebase/auth';
import { Link } from 'react-router-dom';

function BasicUserInfo() {


  //Verify Account implementation
  const [user, setItems] = useState([]);

  useEffect(() => {
    // @ts-ignore
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
    setItems(user);
    }
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <p>
        { user }
      </p>
    </div>
  )
}

export default BasicUserInfo