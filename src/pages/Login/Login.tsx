import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { Card, Container } from 'react-bootstrap'
import '../../assets/styles/login.css';

export default function Login() {
  return (
    <>
      <Container className="mainCon">
        <Card>
          <Card.Body>
          <LoginForm/>
          <p style={{textTransform:'none'}}>Don't have an account? <Link to={'/register'}>Register</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
