import { Link } from 'react-router-dom'
import LoginForm from './LoginForm'
import { Card, Container, Row } from 'react-bootstrap'
import '../../assets/styles/login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <>
    <Row style={{marginTop:'50px'}}>
      <img 
        src='/images/back.png' 
        alt='' 
        className='back-btn'
        onClick={() => navigate("/home")}
      />
      <Container className="mainCon">
        <Card>
          <Card.Body>
          <LoginForm/>
          <p style={{textTransform:'none'}}>Don't have an account? <Link to={'/register'}>Register</Link></p>
          </Card.Body>
        </Card>
      </Container>
    </Row>
    </>
  )
}
