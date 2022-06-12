import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import UserData from '../../models/User';
import { ToastContainer, Toast, Button} from 'react-bootstrap';

export default function Profile() {
  const state = useLocation().state as UserData;
  console.log(state)

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  function Example() {
    return (
          <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
          </Toast>
    );
  }

  return (
    <>
    <Navigation />
    <div>
      <h1>Users</h1>
      <p> 
        {state?.userId}
      </p>
    </div>
    </>
  )
}
