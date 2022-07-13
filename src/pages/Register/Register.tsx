import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import { Card, Container, Row } from 'react-bootstrap'
import '../../assets/styles/login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <>
    <Row>
      <img 
        src='/images/back.png' 
        alt='' 
        className='back-btn'
        onClick={() => navigate("/home")}
      />
      <Container className="mainregCon">
        <Card style={{height:'100%'}}>
          <Card.Body>
          <RegisterForm />
            <p>Already registered? <Link to={'/login'}>Login</Link></p>
          </Card.Body>
        </Card>
      </Container>
      </Row>
    </>
  )
}
