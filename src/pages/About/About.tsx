import Navigation from "../Components/Navigation"
import '../../assets/styles/About.css';

export default function About() {

  return (
    <>
    <Navigation></Navigation>
    <body>
    <div>
      <h1 className="About">About us</h1>
        <div className='about-us'>
          <p>What is it that fuels you? For me, it’s The Artistry. 
            I love writing about my daily life and what interests me, and sharing all of my thoughts with my readers. 
            The site is an open and honest platform about how to make the best of what comes my way.</p>
          <p>The Artistry is truly my passion project, gaining more and more traction each day. 
            I hope you enjoy my site and all of the unique content I offer. 
            Take a look around; perhaps you’ll discover what exhilarates you as well. Are you ready to be inspired?</p>
        </div>
    </div>
    <div className="row"> 
      <div className='teamimage'>
        <img src='/images/profile.png' alt="teamimage1" className='teamimg'/>
      </div>
      <div className='teamimage'>
        <img src='/images/profile.png' alt="teamimage2" className='teamimg'/>
      </div>

    </div>
    </body>
    </>
  )
}