import { useEffect, useState } from "react";
import { Button, Nav, Tabs, Tab, Container, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../assets/styles/Body.css";
import UserData from "../../models/User";
import { fetchTotalSaved } from "../../services/Firebase/productService";
import Footer from "../Components/Footer";
import Navigation from "../Components/Navigation";
import BarChart from "./BarChart";

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
        </div>
      </div>
      <br/>

      <Container className="stats-container">
        <Row>
          <Col style={{ backgroundColor: "#2222", borderRadius: "5px" }}>
            <div className="numofpounds">
              {totalSaved} 
              <p>Pounds of Clothes</p>
              <img src="./images/saved.png"/>
            </div>
            <div className="illustration">
              <img src="./images/house.png" alt="" className="img-illustrate" />
              <p style={{ marginTop: "50px", fontSize: "50px" }}>=</p>
              <p>
                <strong>3.2kg or 7.1lbs of waste thrown everday</strong>
              </p>
            </div>
          </Col>
          <Col>
            <div className="statistics">
              <Tabs
                defaultActiveKey="home"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
              >
                <Tab eventKey="weekly" title="Weekly">
                  <div>weeklyss</div>
                </Tab>
                <Tab eventKey="monthly" title="Monthly">
                  <div>monthlyss</div>
                </Tab>
                <Tab eventKey="yearly" title="Yearly">
                  <div>yearlyss</div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <div className="gif-container">
        <p className="text1">
          <strong>
            This is how much wastes in pounds by users on ProThrift potentially
            saved in 2022 by buying and selling used things instead of new. By
            prolonging the lifetime of clothes we are releasing the pressure on
            the earth's natural resources.
          </strong>
        </p>
      </div>
      <br />

      <div className="circularEcon">
        <h1>Circular Economy</h1>
        <img src="./images/circular_economy.gif"/>
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
