import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navigation from "../Components/Navigation";
import UserData from "../../models/User";
import "../../assets/styles/UserProfile.css";
// import '../../assets/styles/UserProfile.css';
import { ToastContainer, Toast, Button, Tabs, Tab } from "react-bootstrap";
import Footer from "../Components/Footer";
import Loading from "../Components/LoadingScreen";

export default function Profile() {
  const navigate = useNavigate();

  const state = useLocation().state as UserData;
  console.log(state);

  return (
    <>
      <Navigation />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div id="content" className="content content-full-width">
              <div className="profile-header">
                <div className="profile-header-cover"></div>

                <div className="profile-header-content">
                  <div className="profile-header-img">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt=""
                    />
                  </div>

                  <div className="profile-header-info">
                    <h4 className="m-t-10 m-b-5">{`${state?.firstName} ${state?.lastName}`}</h4>
                    <button
                      className="edit-btn"
                      onClick={() => navigate("/editprofile", { state: state })}
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>

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
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
