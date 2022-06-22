import { useEffect, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Body.css";
import UserData from "../../models/User";
import { fetchTotalSaved } from "../../services/Firebase/firestoreService";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";

export default function Body() {
  const state = useLocation().state as UserData;
  const [totalSaved, setTotalSaved] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTotal();
  });

  async function fetchTotal() {
    const total = await fetchTotalSaved();
    if (total) {
      setTotalSaved(total);
    }
  }



  return (
    <>
      <Navigation/>
      <div
        className="background"
        style={{ backgroundImage: "url(/images/header.png)" }}>
        <div>
          <img src="/images/ProThrift-logo.png" className="logo" alt="" />
        </div>
      </div>
      <div className="gif-container">
      <div className="text1Con">
        <div className="numofpounds">
          {totalSaved} Pounds
        </div>
        <p className="text1"><strong>This is how much wastes in pounds by users on ProThrift 
        potentially saved in 2022 by buying and selling used 
        things instead of new. By prolonging the lifetime of steel we are 
        releasing the pressure on the earth's natural resources.</strong></p>
      </div>
      </div>
      <br/>
      <p>STATISTICS HERE?</p>

      <div className="text2">
        <h1 className="textTitle">What We Do!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
      <br />

      <div className="testimonials">
        <p>Testimonials</p>
        <h3>People love this!</h3>
        <div className="testimony">
          <span>"This platform is so cool and create so much value"</span>
          <span>"This platform is so cool and create so much value"</span>
          <span>"This platform is so cool and create so much value"</span>
        </div>
      </div>
      <br />
      <div className="feedback">
        <h1 className="fdback">Feedback!</h1>
        <Link to={"/feedback"}>
          <Button className="fdBtn">Click here</Button>
        </Link>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
}
