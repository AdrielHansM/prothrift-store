import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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
      <Navigation />

      <div
        className="background"
        style={{ backgroundImage: "url(/images/header.png)" }}
      >
        <div>
          <img src="/images/ProThrift-logo.png" className="logo" alt="" />
          <p className="bcktext">Sustainability is the Key </p>
        </div>
      </div>
      <br />
      <div className="text1Con">
        <p className="text1">Total of Users saved a Potential</p>
        <div className="numofpounds">
          <p>{totalSaved} Pounds</p>
        </div>
        <p className="text1">By Doing Secondhand Shopping</p>
      </div>
      <br />

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
