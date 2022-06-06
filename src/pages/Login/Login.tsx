import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { Card, Container } from 'react-bootstrap'
import '../../assets/styles/login.css';

interface LoginProps {
  register?: boolean;
}

export default function Login(props: LoginProps) {
  return (
    <>
      <Container className="mainCon">
        <Card>
          <Card.Body>
          <LoginForm register={!!props.register}/>
          <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
