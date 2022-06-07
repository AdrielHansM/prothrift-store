import Navigation from "./Navigation"
import '../../assets/styles/Body.css';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Body() {

    return(
        <>
        <Navigation></Navigation>

        <article className='bckimage'>
          <img src='/images/backimage.jpg' alt="background" className='backimage'/>
          <p className='bcktext'>Sustainability is the Key</p>
        </article>
        <br/>
        
        <body>
            <div className="text1Con">
                <p className="text1">Total of Users saved a Potential</p>
                    <div className="numofpounds">
                        <p>### Pounds</p>
                    </div>
                <p className="text1">By Doing Secondhand Shopping</p>
            </div>
            <br/>

            <div className="text2">
                <h1 className="textTitle">What We Do!</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <br/>

            <div className="testimonials">
                <p>Testimonials</p>
                <h3>People love this!</h3>
                <div className="testimony">
                    <span>"This platform is so cool and create so much value"</span>
                    <span>"This platform is so cool and create so much value"</span>
                    <span>"This platform is so cool and create so much value"</span>
                </div>
            </div>
            <br/>
        </body>
        <footer className="feedback">
            <h1 className="fdback">Feedback!</h1>
            <Link to={'/firstfeat'}><Button className="fdBtn">Send us a message</Button></Link>
        </footer>
        <hr/>
        </>
    )
}