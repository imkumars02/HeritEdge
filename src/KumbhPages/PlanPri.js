import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./PlanPri.css";
import { Luggage, LuggageIcon, LocateIcon, MapPin } from "lucide-react";
import planImg from "../Images/planImg.png";

const PlanPri = () => {
  const planningOptions = [
    {
      icon: <Luggage className="nav-icon" />,
      title: "How to Reach",
      description:
        "Explore seamless travel options by air, rail, or road, and start your journey seamlessly.",
      link: "/Destination", 
    },
    {
      icon: <LuggageIcon className="nav-icon" />,
      title: "Trip Planner",
      description:
        "Explore our curated list of accommodations and book your serene retreat.",
      link: "/PlanTrip",
    },
    {
      icon: <LocateIcon className="nav-icon" />,
      title: "Explore Nashik",
      description:
        "Explore the tour packages covering the grand Maha Kumbh Mela and nearby attractions of Prayagraj.",
      link: "/HomePage",
    },
    {
      icon: <MapPin className="nav-icon" />,
      title: "Nearby Attractions",
      description:
        "Explore nearby attractions, including popular locations like Varanasi, Ayodhya Dham, and more.",
      link: "/ExplorePages",
    },
  ];

  return (
    <div className="pilgrimage-section">
      <div className="content-container">
        <div className="header">
          <div className="icon-container">
            <Luggage className="header-icon" />
          </div>
          <h1 style={{ color: "var(--white)" }}>Plan your Pilgrimage</h1>
        </div>

        <p className="subtitle">
          Join us in this extraordinary journey and witness the confluence of
          tradition, devotion, and enlightenment.
        </p>

        <div className="main-content">
          <div className="navigation-cards">
            {planningOptions.map((option, index) => (
              <Link key={index} to={option.link} className="nav-card">
                {" "}
                {/* Use Link to navigate */}
                <div className="card-icon">{option.icon}</div>
                <div className="card-content1">
                  <h2>{option.title}</h2>
                  <p>{option.description}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="image-collage">
            <img src={planImg} alt="PlanTour" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanPri;
