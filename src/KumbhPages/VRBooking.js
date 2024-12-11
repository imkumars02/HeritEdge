import React from "react";
import "./VRBooking.scss";
import KumbhNavBar from "./KumbhNavBar";
import Footer from "../Footer";
import Kalaram from '../Images/kalaram.jpeg'

const VRBooking = () => {
  const handleBookTour = () => {
    console.log("Booking virtual tour");
    // Add booking logic here
  };

  const handleViewAR = () => {
    console.log("Opening AR view");
    // Add AR view logic here
  };

  return (
    <>
      <KumbhNavBar />
      <div className="vr-booking-container">
        <div className="content-wrapper">
          <h1>Unable to Reach This Place ?</h1>
          <h2>Visit this Place Virtually By just few steps !</h2>

          <div className="image-container">
            <img
              src={Kalaram} // Replace with actual image path
              alt="Temple virtual tour"
              className="temple-image"
            />
          </div>

          <div className="buttons-container">
            <button className="booking-button" onClick={handleBookTour}>
              Book My Virtual Tour
            </button>
            <button className="ar-button" onClick={handleViewAR}>
              View In AR
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VRBooking;
