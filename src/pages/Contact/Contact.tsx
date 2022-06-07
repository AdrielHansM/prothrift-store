import React, { ChangeEvent, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import { getUser } from '../../services/Firebase/firestoreService';
import { getLoggedUser } from '../../services/Firebase/authService';
import { Button, Form } from 'react-bootstrap'


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
    <Form className="feedbck">
        <h4>Get in touch</h4>
        <br/>
        <h2>Send us a message!</h2>

        <Form.Group className='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type={'email'} name="email" placeholder="Email..." />
        </Form.Group>

        <Form.Group className="name">
          <Form.Label>First Name</Form.Label>
          <Form.Control type={'fname'} name="fname" placeholder="First Name..."/>
        </Form.Group>

        <Form.Group className="name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type={'lname'} name="lname" placeholder="Last Name..."/>
        </Form.Group>

        <Form.Group className="msg">
          <Form.Label>Message</Form.Label>
          <Form.Control type={'message'} name="message" className="msgcontent"/>
        </Form.Group>

        <Button type='submit' className="btnsubmit">Submit</Button>
      </Form>
    </>
  )
}
