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
                    <h4>{`${state?.firstName} ${state?.lastName}`}</h4>
                    <button
                      className="edit-btn"
                      onClick={() => navigate("/editprofile", { state: state })}
                    >
                      Edit Profile
                    </button>
                  </div>
              </div>
            </div>
          </div>

          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="tab-col"
          >
            <Tab eventKey="weekly" title="LISTS">
              <div>Product Lists</div>
            </Tab>

            <Tab eventKey="monthly" title="REVIEWS">
              <div>Your Reviews</div>
            </Tab>
            
          </Tabs>

        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}
