import Navigation from "../Components/Navigation"
import '../../assets/styles/Body.css';
import { Button, Form } from 'react-bootstrap'


export default function Feedback() {

    return (
        <>
        <Navigation></Navigation>
        
        <Form className="feedbck">
            <h1>Feedback Form</h1>

            <Form.Group className='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control type={'email'} name="email" placeholder="Email..." />
            </Form.Group>

            <Form.Group className="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type={'name'} name="name" placeholder="Name..."/>
            </Form.Group>

            <Form.Group className="msg">
              <Form.Label>Message</Form.Label>
              <Form.Control type={'message'} name="message" placeholder='Type here' className="msgcontent"/>
            </Form.Group>

            <Button type='submit' className="btnsubmit">Submit</Button>
        </Form>
        </>
    )
}
