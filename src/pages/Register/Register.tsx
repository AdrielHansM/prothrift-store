import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { Card, Container } from 'react-bootstrap'
import '../../assets/styles/login.css';

export default function Login() {
  return (
    <>
      <Container className="mainregCon">
        <Card style={{height:'100%'}}>
          <Card.Body>
          <RegisterForm />
            <p>Already registered? <Link to={'/login'}>Login</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
