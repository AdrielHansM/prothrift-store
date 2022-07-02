import Navigation from "../../Components/Navigation";
import "../../../assets/styles/EditProfile.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserData from "../../../models/User";
import { useState } from "react";
import { createUser } from "../../../services/Firebase/productService";

export default function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState(0);

  const [isFNameModified, setIsFNameModified] = useState(false);
  const [isLNameModified, setIsLNameModified] = useState(false);
  const [isEmailModified, setIsEmailModified] = useState(false);
  const [isContactModified, setIsContactModified] = useState(false);

  const userState = useLocation().state as UserData;
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (
      (isFNameModified ||
        isLNameModified ||
        isEmailModified ||
        isContactModified) &&
      (firstName !== userState.firstName ||
        lastName !== userState.lastName ||
        email !== userState.email ||
        contact !== userState.contactNumber)
    ) {
      const dateUpdated = new Date();
      createUser(
        userState.userId,
        firstName,
        lastName,
        email,
        contact,
        dateUpdated
      ).then(() => {
        userState.firstName = firstName;
        userState.lastName = lastName;
        userState.email = email;
        userState.contactNumber = contact;
        userState.dateUpdated = dateUpdated;
        navigate("/profile", { state: userState });
      });
    }

    if (
      !isFNameModified &&
      !isLNameModified &&
      !isEmailModified &&
      !isContactModified
    ) {
      alert("No changes made");
    }
  };

  return (
    <>
      <Navigation />

      <div className="row">
        <div className="col-md-5">
          <div className="edit-details-con">
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="labels">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  value={
                    isFNameModified || firstName
                      ? firstName
                      : userState?.firstName
                  }
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setIsFNameModified(true);
                    console.log("tyope");
                  }}
                />
              </div>

              <div className="col-md-6">
                <label className="labels">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="last name"
                  value={
                    isLNameModified || lastName ? lastName : userState?.lastName
                  }
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setIsLNameModified(true);
                  }}
                />
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">Phone Number</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Phone Number"
                  value={
                    isContactModified || contact
                      ? contact
                      : userState?.contactNumber
                  }
                  onChange={(e) => {
                    setContact(parseInt(e.target.value));
                    setIsContactModified(true);
                  }}
                />
              </div>

              <div className="col-md-12 mt-3">
                <label className="labels">Email Address</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Email"
                  value={isEmailModified || email ? email : userState?.email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setIsEmailModified(true);
                  }}
                />
              </div>
            </div>

            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
