import React, { useState } from "react";
import "./Destination.scss";
import KumbhNavBar from "./KumbhPages/KumbhNavBar";
import Footer from "./Footer";
import flight from './Images/flight.jpg'
import train from './Images/train.jpg'
import bus from './Images/bus.jpg'


const Destination = () => {
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");

  const transportOptions = [
    {
      type: "Train",
      image: train, // Replace with actual image path
      buttonText: "Search for the trains",
    },
    {
      type: "Flight",
      image: flight, // Replace with actual image path
      buttonText: "Search for the Flights",
    },
    {
      type: "Bus",
      image: bus, // Replace with actual image path
      buttonText: "Search for the Buses",
    },
  ];

  const handleSearch = () => {
    // navigate('https://www.irctc.co.in');
    window.location.href = 'https://www.ixigo.com'
    // console.log(`Searching for ${type} from ${fromLocation} to ${toLocation}`);
  };

  return (
    <>
      <KumbhNavBar />
      <div className="destination-container">
        <h1>Reach to the Destination Safely!</h1>

        <div className="location-inputs">
          <div className="input-group">
            <label>From:</label>
            <input
              type="text"
              value={fromLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              placeholder="Enter departure city"
            />
          </div>

          <div className="input-group">
            <label>To:</label>
            <input
              type="text"
              value={toLocation}
              onChange={(e) => setToLocation(e.target.value)}
              placeholder="Enter destination city"
            />
          </div>
        </div>

        <div className="transport-options">
          {transportOptions.map((option, index) => (
            <div key={index} className="transport-card">
              <div className="image-container">
                <img src={option.image} alt={option.type} />
              </div>
              <h3>{option.type}</h3>
              <button
                onClick={() => handleSearch()}
                className="search-button"
              >
                {option.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Destination;
