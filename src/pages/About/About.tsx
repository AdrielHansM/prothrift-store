import { useLocation } from "react-router-dom";
import "../../assets/styles/About.css";
import Navigation from "../Components/Navigation";
import UserData from "../../models/User";
import Footer from "../Components/Footer";

export default function About() {
  const state = useLocation().state as UserData;
  console.log(state);

  return (
    <>
      <Navigation />

      <div className="About">
        <div className="about-container">
          <h1>About Us</h1>
          <p style={{ fontSize: "40px", textTransform: "none" }} className="about-text">
            Empowers Consumers and Promotes Thrifting as a Pro-Environmental{" "}
          </p>
        </div>
      </div>

      <div className="about-content">
        <h2>This is ProThrift</h2>
        <p>
          ProThrift is a secondhand platform with a mission to empower people in
          their daily lives. "CHANGE LINE - We do this by providing leading
          online marketplaces, building world-class media houses, and helping
          great companies scale."{" "}
        </p>
      </div>

      <div className="map">
        <p>Our Location</p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.1700146273524!2d120.60876511482714!3d16.416189588667432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3391a1572cc1835b%3A0xb82d1aa8aa94d8fe!2sNavy%20Base%20Rd%2C%20Baguio%2C%20Benguet!5e0!3m2!1sen!2sph!4v1655870664320!5m2!1sen!2sph"
          style={{ border: "0" }}
        ></iframe>
      </div>
      <Footer/>
    </>
  );
}
