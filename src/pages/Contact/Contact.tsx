import { useState } from 'react'
import Navigation from "../Components/NavBar";

import { Button, Form } from "react-bootstrap";
import "../../assets/styles/Body.css";
import Footer from "../Components/Footer";
import emailjs from 'emailjs-com'

export default function Contact() {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const submit = () => {
    if (firstname && lastname && email && message) {
        // TODO - send mail
        const serviceId = 'service_id';
        const templateId = 'template_id';
        const userId = 'user_id';
        const templateParams = {
            firstname,
            lastname,
            email,
            message
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then(response => console.log(response))
            .then(error => console.log(error));

      setFirstName('');
      setLastName('');
      setEmail('');
      setMessage('');
      setEmailSent(true);
    } else {
        alert('Please fill in all fields.');
    }
  }

  return (
    <>
      <Navigation />
      <Form className="feedbck">
        <p>Get in touch</p>
        <br />
        <h2>Send us a message!</h2>

        <Form.Group className="email">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type={"email"}
            name="email"
            placeholder="Email..." 
            value={email} 
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type={"text"}
            placeholder="First Name..."
            value={firstname} 
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type={"text"}
            placeholder="Last Name..."
            value={lastname} 
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="msg">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type={"message"}
            placeholder="Type here"
            className="msgcontent"
            value={message} 
            onChange={e => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button 
          type="submit" 
          className="btnsubmit"
          onClick={submit}
        >
          Submit
        </Button>
      </Form>
      {/* <span className={emailSent ? 'visible' : null}>Thank you for your message, we will be in touch in no time!</span> */}
      <Footer />
    </>
  );
}