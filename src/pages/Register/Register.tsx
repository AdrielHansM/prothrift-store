import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { Card, Container } from 'react-bootstrap'

interface LoginProps {
  register?: boolean;
}

export default function Login(props: LoginProps) {
  return (
    <>
      <Container className="w-50 mt-5 mb-5">
        <Card>
          <Card.Body>
          <RegisterForm register={!!props.register}/>
            <p>Already registered? <Link to={'/login'}>Login</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
