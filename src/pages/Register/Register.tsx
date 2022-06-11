import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { Card, Container } from 'react-bootstrap'
import '../../assets/styles/login.css';


interface LoginProps {
  register?: boolean;
}

export default function Login(props: LoginProps) {
  return (
    <>
      <Container className="mainregCon">
        <Card>
          <Card.Body>
          <RegisterForm />
            <p>Already registered? <Link to={'/login'}>Login</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
