import Navigation from "../Components/Navigation";

import { Button, Form } from "react-bootstrap";
import "../../assets/styles/Body.css";
import Footer from "../Components/Footer";

export default function Contact() {
  return (
    <>
      <Navigation />
      <Form className="feedbck">
        <p>Get in touch</p>
        <br />
        <h2>Send us a message!</h2>

        <Form.Group className="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type={"email"} name="email" placeholder="Email..." />
        </Form.Group>

        <Form.Group className="name">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type={"fname"}
            name="fname"
            placeholder="First Name..."
          />
        </Form.Group>

        <Form.Group className="name">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type={"lname"}
            name="lname"
            placeholder="Last Name..."
          />
        </Form.Group>

        <Form.Group className="msg">
          <Form.Label>Message</Form.Label>
          <Form.Control
            type={"message"}
            name="message"
            placeholder="Type here"
            className="msgcontent"
          />
        </Form.Group>

        <Button type="submit" className="btnsubmit">
          Submit
        </Button>
      </Form>
      <Footer />
    </>
  );
}
