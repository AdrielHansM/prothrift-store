import { useLocation } from "react-router-dom";
import "../../assets/styles/About.css";
import Navigation from "../Components/Navigation";
import UserData from "../../models/User";
import Footer from "../Components/Footer";
import { Col, Row } from "react-bootstrap";

export default function About() {
  const state = useLocation().state as UserData;
  console.log(state);

  return (
    <>
      <Navigation />

      <div className="About">
        <div className="about-container">
          <h1>About Us</h1>
          <div className="about-text">
            Empowers Consumers and Promotes Thrifting as a Pro-Environmental
          </div>
        </div>
      </div>

      <div className="about-content">
        <h2>This is ProThrift</h2>
        <p>
          ProThrift is a secondhand platform with a mission to empower people in
          their daily lives. "CHANGE LINE - We do this by providing leading
          online marketplaces, building world-className media houses, and helping
          great companies scale."
        </p>
      </div>

      <section id="team" className="team content-section">
        <div className="container">
          <div className="text-center">
            <div className="col-md-12">
              <h2>Our Team</h2>
              <h3 className="caption gray">Meet the people who make awesome stuffs</h3>
            </div>

          <div className="container2">
          <div className="row-con">

            <div className="col-team">
              <div className="team-member">
                <figure>
                  <img src="https://lh3.googleusercontent.com/a-/AOh14GiL-y6piLbVLUGYEtFPEikBCWFtmdfCYhVIn8bD=s360-p-rw-no" alt="" className="img-responsive"/>
                  <figcaption>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae asperiores mollitia.</p>
                    <ul>
                      <li><a href=""><i className="fa-brands fa-facebook fa-2x"></i></a></li>
                    </ul>
                  </figcaption>
                </figure>
                <h4>Jade Jimenez</h4>
              </div>
            </div>

              <div className="col-team">
                <div className="team-member">
                  <figure>
                    <img src="https://lh3.googleusercontent.com/a-/AOh14GiL-y6piLbVLUGYEtFPEikBCWFtmdfCYhVIn8bD=s360-p-rw-no" alt="" className="img-responsive"/>
                    <figcaption>
                      <p>Neque minima ea, a praesentium saepe nihil maxime quod esse numquam explicabo eligendi.</p>
                      <ul>
                        <li><a href=""><i className="fa-brands fa-facebook fa-2x"></i></a></li>
                      </ul>
                    </figcaption>
                  </figure>
                  <h4>Jianina Escalo</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

      <div className="map">
        <Col>
          <div >
            <h1>Our Location</h1>
          </div>
          <div>
            <h2>University of the Cordilleras, Gov. Pack Road</h2>
            <h2>Baguio City, Benguet, 2600</h2>
          </div>
        </Col>
        <Col>
          <iframe className="gmap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2210.947130406117!2d120.59794280528612!3d16.409037850732762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xad71a188041ff97!2sUniversity%20Of%20The%20Cordilleras%20-%20Purchasing%20Office!5e0!3m2!1sen!2sph!4v1656098757826!5m2!1sen!2sph"></iframe>
        </Col>
      </div>

      <Footer/>
    </>
  );
}
