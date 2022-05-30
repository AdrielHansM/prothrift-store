import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { Card, Container } from 'react-bootstrap'

interface LoginProps {
  register?: boolean;
}

export default function Login(props: LoginProps) {
  return (
    <>
      <Container className="w-50 mt-5">
        <Card>
          <Card.Body>
          <LoginForm register={!!props.register}/>
          {!props.register ? (
          <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
          ) : (
            <p>Already registered? <Link to={'/login'}>Login</Link></p>
          )}
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
