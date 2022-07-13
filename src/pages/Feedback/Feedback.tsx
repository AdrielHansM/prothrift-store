import { useState } from 'react'
import "../../assets/styles/Body.css";
import { Button, Form } from "react-bootstrap";
import Navigation from "../Components/NavBar";
import Footer from "../Components/Footer";
import emailjs from 'emailjs-com'

export default function Feedback() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const submit = () => {
    if (name && email && message) {
        // TODO - send mail
        const serviceId = 'service_id';
        const templateId = 'template_id';
        const userId = 'user_id';
        const templateParams = {
            name,
            email,
            message
        };

        emailjs.send(serviceId, templateId, templateParams, userId)
            .then(response => console.log(response))
            .then(error => console.log(error));

      setName('');
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
        <h1>Feedback Form</h1>

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
          <Form.Label>Name</Form.Label>
          <Form.Control      
            type={"text"}
            placeholder="First Name..."
            value={name} 
            onChange={e => setName(e.target.value)}
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
      <Footer />
    </>
  );
}
