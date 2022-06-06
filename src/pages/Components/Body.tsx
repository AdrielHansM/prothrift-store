import Navigation from "./Navigation"
import '../../assets/styles/Body.css';


export default function Body() {

    return(
        <>
        <Navigation></Navigation>

        <article className='bckimage'>
          <img src='/images/backimage.jpg' alt="background" className='backimage'/>
          <p className='bcktext'>Sustainability is the Key</p>
        </article>
        <br/>
        
        <p className="text1">Total of Users saved a Potential</p>
        <div className="numofpounds">
            <p>### Pounds</p>
        </div>
        <p className="text1">By Doing Secondhand Shopping</p>
        <br/>

        <div className="text2">
            <h1 className="textTitle">What We Do!</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <br/>
        </>
    )
}