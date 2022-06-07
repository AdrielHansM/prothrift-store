import '../../assets/styles/FirstFeat.css';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function SecFeat() {
    return(
        <>
        <body className='feat2'>
            <div className="feattext2">
                <h1>Collect your first Points</h1>
                <h2>10</h2>
            </div>
            <Link to={'/profile'}><Button className="feat2Btn">Get</Button></Link>
            <br/>
            <div className='note-container'>
                <h4>Note:</h4>
                <p>
                <em>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</em>
                </p>
            </div>
        </body>
        </>
    )
}