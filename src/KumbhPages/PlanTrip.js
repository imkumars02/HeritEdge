import React, { useState, useEffect } from "react";
import "./PlanTrip.scss";
import KumbhNavBar from "./KumbhNavBar";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

const places = [
  {
    id: 1,
    name: "Trimbakeshwar Temple",
    category: "historical",
    budget: "normal",
  },
  { id: 2, name: "Sula Vineyards", category: "food", budget: "luxury" },
  {
    id: 3,
    name: "Pandavleni Caves",
    category: "historical",
    budget: "economy",
  },
  { id: 4, name: "Ramshej Fort", category: "adventure", budget: "economy" },
  { id: 5, name: "Coin Museum", category: "artCulture", budget: "normal" },
  { id: 6, name: "Gargoti Museum", category: "artCulture", budget: "normal" },
  { id: 7, name: "Gangapur Dam", category: "nature", budget: "economy" },
  { id: 8, name: "York Winery", category: "food", budget: "luxury" },
];

const PlanTrip = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    duration: 1,
    freeTime: { "Day 1": "10:00-18:00" },
    startDate: "",
    endTime: "08:00",
    timeFormat: "AM",
    interests: {
      historical: 0,
      artCulture: 0,
      nature: 0,
      adventure: 0,
      shopping: 0,
      food: 0,
    },
    companion: "",
    budget: "",
  });
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:5000/api/check-auth");
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Authentication check failed:", error);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    filterPlaces();
  }, [formData.interests, formData.budget]);

  const filterPlaces = () => {
    const filtered = places.filter((place) => {
      const interestMatch = formData.interests[place.category] > 50;
      const budgetMatch =
        formData.budget === place.budget || formData.budget === "";
      return interestMatch && budgetMatch;
    });
    setFilteredPlaces(filtered.slice(0, 4));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDurationChange = (increment) => {
    const newDuration = Math.max(1, formData.duration + increment);
    updateFormData("duration", newDuration);
  };

  const handleFinalSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/plan-trip", {
        ...formData,
        suggestedPlaces: filteredPlaces,
      });
      console.log("Trip plan saved:", response.data);
      navigate("/Schedule");
    } catch (error) {
      console.error("Error saving trip plan:", error);
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
      } else {
        alert(
          "An error occurred while saving your trip plan. Please try again."
        );
      }
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <div className="icon-title">
              <span className="icon">⏱️</span>
              <h3>Travel Duration</h3>
            </div>
            <p>Enter the number of days for your trip.</p>
            <div className="duration-control">
              <button onClick={() => handleDurationChange(-1)}>−</button>
              <span>
                {formData.duration} day{formData.duration > 1 ? "s" : ""}
              </span>
              <button onClick={() => handleDurationChange(1)}>+</button>
            </div>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <div className="icon-title">
              <span className="icon">🕒</span>
              <h3>Free Time</h3>
            </div>
            <p>Set your available free time for each day</p>
            <div className="time-selector">
              <h4>Day 1</h4>
              <div className="time-range">
                <input
                  type="text"
                  value={formData.freeTime["Day 1"]}
                  onChange={(e) =>
                    updateFormData("freeTime", { "Day 1": e.target.value })
                  }
                  placeholder="e.g., 10:00-18:00"
                />
              </div>
            </div>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <div className="icon-title">
              <span className="icon">📅</span>
              <h3>Start Date</h3>
            </div>
            <p>Choose the start date for your trip</p>
            <div className="calendar-container">
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => updateFormData("startDate", e.target.value)}
              />
            </div>
            <div className="time-format">
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => updateFormData("endTime", e.target.value)}
              />
              <div className="format-buttons">
                <button
                  className={formData.timeFormat === "AM" ? "active" : ""}
                  onClick={() => updateFormData("timeFormat", "AM")}
                >
                  AM
                </button>
                <button
                  className={formData.timeFormat === "PM" ? "active" : ""}
                  onClick={() => updateFormData("timeFormat", "PM")}
                >
                  PM
                </button>
              </div>
            </div>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        );

      case 4:
        return (
          <div className="form-step">
            <div className="icon-title">
              <span className="icon">🎯</span>
              <h3>Your Interests</h3>
            </div>
            <p>Indicate your level of interest for each category</p>
            <div className="interests-list">
              {Object.entries({
                historical: "Historical",
                artCulture: "Art & Culture",
                nature: "Nature",
                adventure: "Adventure",
                shopping: "Shopping",
                food: "Food",
              }).map(([key, label]) => (
                <div key={key} className="interest-item">
                  <label>{label}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.interests[key]}
                    onChange={(e) => {
                      const newInterests = {
                        ...formData.interests,
                        [key]: parseInt(e.target.value),
                      };
                      updateFormData("interests", newInterests);
                    }}
                  />
                  <span>{formData.interests[key]}%</span>
                </div>
              ))}
            </div>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        );

      case 5:
        return (
          <div className="form-step">
            <div className="icon-title">
              <span className="icon">👥</span>
              <h3>Travel Companion</h3>
            </div>
            <p>Select your travel group type</p>
            <div className="companion-options">
              {["Solo", "Couple", "Family", "Friends"].map((type) => (
                <button
                  key={type}
                  className={`companion-button ${
                    formData.companion === type ? "active" : ""
                  }`}
                  onClick={() => updateFormData("companion", type)}
                >
                  {type}
                </button>
              ))}
            </div>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        );

      case 6:
        return (
          <div className="form-step">
            <div className="icon-title">
              <span className="icon">💰</span>
              <h3>Your Budget</h3>
            </div>
            <p>
              Select your preferred budget type to help us recommend suitable
              accommodations, activities, and experiences.
            </p>
            <div className="budget-options">
              {["Economy", "Normal", "Luxury"].map((type) => (
                <button
                  key={type}
                  className={`budget-button ${
                    formData.budget === type.toLowerCase() ? "active" : ""
                  }`}
                  onClick={() => updateFormData("budget", type.toLowerCase())}
                >
                  {type}
                </button>
              ))}
            </div>
            <button className="next-button" onClick={handleNext}>
              Next
            </button>
          </div>
        );

      case 7:
        return (
          <div className="form-step">
            <div className="icon-title">
              <span className="icon">🗺️</span>
              <h3>Suggested Places</h3>
            </div>
            <p>Based on your preferences, here are some suggested places:</p>
            <div className="suggested-places">
              {filteredPlaces.map((place) => (
                <div key={place.id} className="place-item">
                  <h4>{place.name}</h4>
                  <p>Category: {place.category}</p>
                  <p>Budget: {place.budget}</p>
                </div>
              ))}
            </div>
            <button className="next-button" onClick={handleFinalSubmit}>
              Plan my trip
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <KumbhNavBar />
      <div className="plan-trip-container">
        <div className="header">
          <h1>Let Nashik's beauty inspire your journey</h1>
          <h2>Plan your trip today!</h2>
        </div>
        <div className="form-container">{renderStep()}</div>
      </div>
      <Footer />
    </>
  );
};

export default PlanTrip;
