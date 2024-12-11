import React from "react";
import "./ExplorePages.scss";
import { useNavigate } from "react-router-dom"; // For navigation
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import trampoline from "../Images/trampoline.png";
import sayantara from "../Images/sayantara.jpg";
import kalaram from "../Images/KalaramMandir.jpg";
import pandavleni from "../Images/pandavleni.jpeg.jpg";
import mangitungi from "../Images/mangitungi.jpeg.jpg";

const ExplorePages = () => {
  const navigate = useNavigate(); // For navigation

  const handleClick = (category) => {
    console.log(`Clicked on ${category}`);
    // Navigate to the corresponding page for the category
    navigate(`/${category}`);
  };

  return (
    <div className="explore-container">
      <DashboardNavBar />
      <div className="explore-scroll">
        <div
          className="explore-card other-places"
          onClick={() => handleClick("otherPlace")}
        >
          <img src={trampoline} alt="Other Places" />
          <div className="card-overlay">
            <h2>Other Places</h2>
          </div>
        </div>

        <div
          className="explore-card nearby-places"
          onClick={() => handleClick("NearFoodPlace")}
        >
          <img src={sayantara} alt="Nearby Food Places" />
          <div className="card-overlay">
            <h2>Nearby Food Places</h2>
          </div>
        </div>

        <div
          className="explore-card temples"
          onClick={() => handleClick("TemplePage")}
        >
          <img src={kalaram} alt="Temples" />
          <div className="card-overlay">
            <h2>Temples</h2>
          </div>
        </div>

        <div
          className="explore-card historical-places"
          onClick={() => handleClick("HistoricalPlace")}
        >
          <img src={pandavleni} alt="Historical Places" />
          <div className="card-overlay">
            <h2>Historical Places</h2>
          </div>
        </div>

        <div
          className="explore-card trekking-points"
          onClick={() => handleClick("Trekking")}
        >
          <img src={mangitungi} alt="Trekking Points" />
          <div className="card-overlay">
            <h2>Trekking Points</h2>
          </div>
        </div>
        <div
          className="explore-card trekking-points"
          onClick={() => handleClick("Trekking")}
        >
          <img src={mangitungi} alt="MisalSpot" />
          <div className="card-overlay">
            <h2>Misal Spot</h2>
          </div>
        </div>
        <div
          className="explore-card trekking-points"
          onClick={() => handleClick("HotelRestorant")}
        >
          <img src={mangitungi} alt="HotelRestorant" />
          <div className="card-overlay">
            <h2>Hotel & Restaurants</h2>
          </div>
        </div>
      </div>
      <Robot />
      <Footer />
    </div>
  );
};

export default ExplorePages;
