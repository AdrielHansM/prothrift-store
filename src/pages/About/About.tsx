import Navigation from "../Components/Navigation"
import '../../assets/styles/About.css';
import { useLocation } from "react-router-dom";
import UserData from "../../models/User";
import { useEffect, useState } from "react";

const initialUser = {
  userId: "",
  firstName: "",
  lastName: "",
  contactNumber: 0,
  email: "",
  isLogged: false,
  isDeleted: false,
  dateCreated: new Date(),
  dateUpdated: new Date()
}

export default function About() {
  const state = useLocation().state as UserData;
  console.log(state)

  return (
    <>
    <Navigation></Navigation>

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
      <div className='teamimage1'>
        <img src='/images/user.png' alt="teamimage1" className='teamimg'/>
        <p>Name1</p>
      </div>
      <div className='teamimage2'>
        <img src='/images/user.png' alt="teamimage2" className='teamimg'/>
        <p>Name2</p>
      </div>
      
    </div>
    </>
  )
}