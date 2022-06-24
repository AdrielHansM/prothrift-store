import { useEffect, useState } from "react";
import { Button, Nav, Tabs, Tab, Container, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Body.css";
import UserData from "../../models/User";
import { fetchTotalSaved } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";
import { PieChart } from "../Components/graphs/PieChart";
import { BarGraph } from "../Components/graphs/BarGraph";

export default function Body() {
  const state = useLocation().state as UserData;
  const [totalSaved, setTotalSaved] = useState(0);


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
        </div>
      </div>
      <br />

      {/* NOTE: This one works */}
      {/* <PieChart /> 
          <BarChart />
      */}
      <Container className="stats-container">
        <Row>
          <div style={{borderRadius: "5px" }} className='first-col'>
            <p className="potentially">Our ProThrifters potentially saved</p>
            
            <div className="numofpounds">
              {totalSaved}
              <div className="pounds-text">
                <div>Pounds</div>
                <div>of Clothes</div>
              </div>
            </div>
            <div className="p-text">equivalent to the monthly waste from:</div>
            
            <div className="illustrate">
              <div className="illustration">
                <img src="./images/house.png" alt="" className="img-illustrate" />
                <strong className="grid-text">
                  <p style={{fontSize:'90px', color:'#FE7475'}} className="numb">15</p>
                  <p className="numb">households</p>
                </strong>
              </div>
              
              <div className="illustration">
                <img src="./images/throwing-trash.png" alt="" className="img-illustrate2" />
                <strong className="grid-text">
                  <p style={{fontSize:'90px', color:'#FE7475'}} className="numb">121</p>
                  <p className="numb">filipinos</p>
                </strong>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <br />
        <p className="text1">
          <strong>
            This is how much wastes in pounds by users on ProThrift potentially
            saved in 2022 by buying and selling used things instead of new. By
            prolonging the lifetime of clothes we are releasing the pressure on
            the earth's natural resources.
          </strong>
        </p>

      <div className="bargraph"> 
      <BarGraph/>
      </div>

      <div className="circularEcon">
        <h1>Circular Economy</h1>
        <p>Second-hand trade is an important part of circular consumption. 
          It means keeping products and materials in continuous use by repairing, reusing, 
          sharing and recycling. We need to do this more – as we are consuming too much, too fast today.</p>
        <img src="./images/circular_economy.gif" />
      </div>

      <div className="UN-goals">
        <h1>UN’s sustainable development goals</h1>
        <div className="UN-text">
          <img src="./images/RCP.gif"/>
          <p>In 2015, the UN launched the 2030 agenda for sustainable development 
            which sets 17 sustainable development goals. The Second Hand Effect aligns 
            with SDG 12; Responsible consumption and production. Buying and selling 
            second-hand is one of the easiest ways you can contribute to the UN’s sustainable development goals. 
            <a href="https://www.un.org/sustainabledevelopment/sustainable-consumption-production/" style={{textDecoration:'none'}}> Read More!</a></p>
        </div>
      </div>

      <div className="feedback">
        <h1>Give us Feedback</h1>
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
